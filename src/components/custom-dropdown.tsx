type props = {
  setFormInput: React.Dispatch<
    React.SetStateAction<{
      name: string;
      descriptionShort: string;
      descriptionLong: string;
      goal: number;
      category: string;
    }>
  >;
  formInput: {
    name: string;
    descriptionShort: string;
    descriptionLong: string;
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
        defaultValue={"default"}
        required
      >
        <option value="default" disabled>
          Select Category
        </option>
        <option >Children</option>
        <option>Environment & Wildlife</option>
        <option>Poverty</option>
        <option>Research</option>
        <option>Religious</option>
        <option>Other</option>
      </select>
    </>
  );
}
