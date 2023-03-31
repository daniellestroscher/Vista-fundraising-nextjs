type props = {
  setFormInput: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      goal: number;
      category: string;
    }>
  >;
  formInput: {
    name: string;
    description: string;
    goal: number;
    category: string;
  };
};

export default function DropdownMenu({ setFormInput, formInput }: props) {
  return (
    <>
      <select
        onChange={(e) =>
          setFormInput({ ...formInput, category: e.target.value })
        }
        className="input"
        required
      >
        <option value="" disabled selected hidden>
          Select Category
        </option>
        <option>Children</option>
        <option>Environment & Wildlife</option>
        <option>Poverty</option>
        <option>Research</option>
        <option>Religious</option>
        <option>Other</option>
      </select>
    </>
  );
}
