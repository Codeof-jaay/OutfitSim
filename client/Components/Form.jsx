import { useState } from 'react'

function Form() {
  const [nums, setNums] = useState({ num1: "", num2: "", num3: "" });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setNums({ ...nums, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nums),
    });

    const data = await response.json();
    setResult(data.result || data.error);
  };

  return (
     <section id="Form" className="relative flex items-center section-spacing c-space">

    <div className=" flex flex-col h-[36rem] rounded-md w-full mx-20 my-10 bg-gradient-to-bl from-purple-600 via-black/30 to-indigo-600" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Add 3 Numbers</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="num1"
          value={nums.num1}
          onChange={handleChange}
          placeholder="Number 1"
          />
        <input
          type="number"
          name="num2"
          value={nums.num2}
          onChange={handleChange}
          placeholder="Number 2"
          />
        <input
          type="number"
          name="num3"
          value={nums.num3}
          onChange={handleChange}
          placeholder="Number 3"
          />
        <button type="submit">Add</button>
      </form>
      {result !== null && <h2>Result: {result}</h2>}
    </div>
          </section>
  );
}

export default Form;
