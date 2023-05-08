import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Crowdfund contract", function () {
  const GOAL = ethers.utils.parseEther("10");

  async function deployCrowdfundFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const CrowdfundFactory = await ethers.getContractFactory(
      "Crowdfund",
      owner
    );
    let crowdfund = await CrowdfundFactory.deploy(GOAL, owner.address);
    await crowdfund.deployed();
    return { crowdfund, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the correct owner and goal", async function () {
      const { crowdfund, owner } = await loadFixture(
        deployCrowdfundFixture
      );
      expect(await crowdfund.getOwner()).to.equal(owner.address);
      expect(await crowdfund.goal()).to.equal(GOAL);
    });
  });

  describe("Donation", function () {
    it("Should reject zero donations", async function () {
      const { crowdfund } = await loadFixture(
        deployCrowdfundFixture
      );
      await expect(crowdfund.donate({ value: 0 })).to.be.revertedWith(
        "Invalid donation amount"
      );
    });

    it("Should accept donations and update the balance and contributors map", async function () {
      const { crowdfund, addr1 } = await loadFixture(
        deployCrowdfundFixture
      );
      const initialBalance = await ethers.provider.getBalance(
        crowdfund.address
      );

      const donationAmount = ethers.utils.parseEther("1");

      await crowdfund.connect(addr1).donate({ value: donationAmount });

      expect(await crowdfund.raised()).to.equal(donationAmount);
      expect(await ethers.provider.getBalance(crowdfund.address)).to.equal(
        initialBalance.add(donationAmount)
      );
    });

    it("Should update the goal status when the goal is reached", async function () {
      const { crowdfund, addr1 } = await loadFixture(
        deployCrowdfundFixture
      );
      await crowdfund.connect(addr1).donate({ value: GOAL });
      expect(await crowdfund.goalReached()).to.equal(true);
    });
  });

  describe("Withdraw", async function () {
    it("Should reject withdrawal requests with a zero balance", async function () {
      const { crowdfund } = await loadFixture(
        deployCrowdfundFixture
      );
      await expect(crowdfund.withdraw()).to.be.revertedWith(
        "sorry, nothing to withdraw."
      );
    });

    it("Should transfer the contract balance to the owner", async function () {
      const { crowdfund, owner, addr1 } = await loadFixture(
        deployCrowdfundFixture
      );
      const donationAmount = ethers.utils.parseEther("5");
      await crowdfund.connect(addr1).donate({ value: donationAmount });

      const initialOwnerBalance = await ethers.provider.getBalance(
        owner.address
      );
      const gasEstimate = await crowdfund.estimateGas.withdraw();
      const tx = await crowdfund.withdraw({ gasLimit: gasEstimate });
      const receipt = await tx.wait();
      const newOwnerBalance = await ethers.provider.getBalance(owner.address);

      expect(
        newOwnerBalance
          .sub(initialOwnerBalance)
          .add(receipt.gasUsed.mul(tx.gasPrice))
      ).to.equal(donationAmount);
    });

    it("Should reject withdrawal requests from non-owners", async function () {
      const { crowdfund, addr1 } = await loadFixture(
        deployCrowdfundFixture
      );
      await expect(crowdfund.connect(addr1).withdraw()).to.be.revertedWith(
        "You do not own this contract."
      );
    });
  });
  describe("Closing", function () {
    it("Should reject closing requests before the goal is reached", async function () {
      const { crowdfund } = await loadFixture(
        deployCrowdfundFixture
      );
      await expect(crowdfund.close()).to.be.revertedWith(
        "The funding goal has not been reached yet."
      );
    });

    it("Should reject repeated closing requests", async function () {
      const { crowdfund, owner, addr1 } = await loadFixture(
        deployCrowdfundFixture
      );
      const fundingGoal = ethers.utils.parseEther("50");
      await crowdfund.connect(addr1).donate({ value: fundingGoal });
      await crowdfund.connect(owner).close();
      await expect(crowdfund.connect(owner).close()).to.be.revertedWith(
        "The contract has already been closed."
      );
    });
    it("Should not allow non-owners to close the contract", async function () {
      const { crowdfund, addr1 } = await loadFixture(
        deployCrowdfundFixture
      );
      const donationAmount = ethers.utils.parseEther("5");
      await crowdfund.connect(addr1).donate({ value: donationAmount });

      await expect(crowdfund.connect(addr1).close()).to.be.revertedWith(
        "You do not own this contract."
      );
    });
    it("Should not allow donations after the contract is closed", async function () {
      const { crowdfund, owner, addr1, addr2 } = await loadFixture(
        deployCrowdfundFixture
      );
      const fundingGoal = ethers.utils.parseEther("50");
      await crowdfund.connect(addr1).donate({ value: fundingGoal });
      await crowdfund.close();
      await expect(
        crowdfund.connect(addr2).donate({ value: fundingGoal })
      ).to.be.revertedWith("Funding goal already met or contract is closed");
    });
  });
});