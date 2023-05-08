import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CrowdfundMarket", function () {
  async function deployMarket() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Market = await ethers.getContractFactory("CrowdfundMarket");
    const market = await Market.deploy();
    await market.deployed();

    return { market, owner, otherAccount };
  }
  async function deployMarketAndCrowdfunds() {
    const { market, owner, otherAccount } = await loadFixture(deployMarket);
    const goal = ethers.utils.parseEther("1");
    await market.createCrowdfund(goal, "meta-url-one"); //1
    await market.createCrowdfund(goal, "meta-url-two"); //2
    await market.connect(otherAccount).createCrowdfund(goal, ""); //3

    const oneContractAddress_GoalReached = (await market.idToCrowdfund(1))
      .crowdfundContract;
    const twoContractAddress = (await market.idToCrowdfund(2))
      .crowdfundContract;
    const threeContractAddress_NotOwners = (await market.idToCrowdfund(3))
      .crowdfundContract;

    await owner.sendTransaction({
      to: oneContractAddress_GoalReached,
      value: goal,
    });

    return {
      market,
      owner,
      otherAccount,
      oneContractAddress_GoalReached,
      twoContractAddress,
      threeContractAddress_NotOwners,
    };
  }

  describe("Deployment", function () {
    it("Should deploy crowdfunds from any account with correct values", async function () {
      const { market, owner, otherAccount } = await loadFixture(deployMarket);

      const goal = ethers.utils.parseEther("1");
      const deployedFromOwner = await market.createCrowdfund(goal, "");
      const addressFromOwner = (await market.idToCrowdfund(1))
        .crowdfundContract;

      const deployedFromOtherAccount = await market
        .connect(otherAccount)
        .createCrowdfund(goal, "");
      const addressFromOtherAccount = (await market.idToCrowdfund(2))
        .crowdfundContract;

      await expect(deployedFromOwner)
        .to.emit(market, "CrowdfundCreated")
        .withArgs(1, "", addressFromOwner, owner.address, goal);
      await expect(deployedFromOtherAccount)
        .to.emit(market, "CrowdfundCreated")
        .withArgs(2, "", addressFromOtherAccount, otherAccount.address, goal);
    });
  });
  describe("Create Crowdfund", function () {
    it("should be passed a goal greater then 0", async () => {
      const { market } = await loadFixture(deployMarket);
      await expect(market.createCrowdfund(0, "meta-url")).to.be.revertedWith(
        "goal received is not greater then 0"
      );
    });
    it("should emit a crowdfund created event", async () => {
      const { market } = await loadFixture(deployMarket);
      const tx = await market.createCrowdfund(100, "meta-url");
      const receipt = await tx.wait();
      const logs = receipt.events;
      const log = logs.find((log: any) => log.event === "CrowdfundCreated");
      expect(log).to.exist;
      expect(log.args.fundId).to.equal(1);
      expect(log.args.metaUrl).to.equal("meta-url");
      expect(log.args.goal).to.equal(100);
    });
  });
  describe("Getters", function () {
    describe("getCrowdfund", function () {
      it("should get struct of id passed", async function () {
        const {
          market,
        } = await loadFixture(deployMarketAndCrowdfunds);

        const struct = await market.getCrowdfund(1);
        expect(struct[0].toString()).to.equal("1");
        expect(struct[1]).to.equal("meta-url-one");
      });
    });
    describe("getActiveFundraisers", function () {
      it("should get only the active fundraisers (goal not reached)", async function () {
        const {
          market,
        } = await loadFixture(deployMarketAndCrowdfunds);

        const activeFundraisers = await market.getActiveFundraisers();
        expect(await activeFundraisers).to.have.lengthOf(2);
      });
    });
    describe("getMyFundraisers", function () {
      it("should only get the fundraisers owned by the message sender", async function () {
        const {
          market,
          otherAccount,
          oneContractAddress_GoalReached,
          twoContractAddress,
          threeContractAddress_NotOwners,
        } = await loadFixture(deployMarketAndCrowdfunds);

        const fundraisers = await market.getMyFundraisers();
        expect(await fundraisers).to.have.lengthOf(2);
        expect(await fundraisers[0].crowdfundContract).to.equal(
          oneContractAddress_GoalReached
        );
        expect(await fundraisers[1].crowdfundContract).to.equal(
          twoContractAddress
        );

        const otherAccountFundraisers = await market
          .connect(otherAccount)
          .getMyFundraisers();
        expect(await otherAccountFundraisers).to.have.length(1);
        expect(await otherAccountFundraisers[0].crowdfundContract).to.equal(
          threeContractAddress_NotOwners
        );
      });
    });
  });
});
