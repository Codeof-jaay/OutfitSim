import { useState } from 'react'
import TypingAnimation from '../src/components/Typoo'

function Form() {
    const word = ["Hello World", "teach me to code"]
    const [nums, setNums] = useState({ num1: "", num2: "", num3: "" });
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
   
    const handleChange = (e) => {
    setNums({ ...nums, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setIsLoading(true);
    try{

        const response = await fetch("http://127.0.0.1:5000/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nums),
        });
        
        const data = await response.json();
        setResult(data.result || data.error);
    }
    catch{
        console.error("Error:", error);                                                          
        setResponse({ error: "Failed to get response" });
    }
    finally{
        setIsLoading(false)
    };
    };

    
  return (
     <section id="Form" className="bg-black/30 border-b border-white/10 pb-12 relative flex items-center section-spacing c-space">

    <div className=" flex flex-col h-[36rem] rounded-md w-full mx-20 my-10 " style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Make a Random Sentence with any 3 words</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-8">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500/20">
                  <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">First Number</div>
        <input
          name="num1"
          type='text'
          value={nums.num1}
          onChange={handleChange}
          placeholder="First Word"
          className='block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6'
          />
          </div>
          </div>
       <div className="mt-8">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500/20">
                  <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">Second Number</div>
        <input
          name="num2"
          type='text'
          value={nums.num2}
          onChange={handleChange}
          placeholder="Second word"
          className='block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6'
          
          />
           </div>
          </div>

        <div className="mt-8">
                <div className="flex border-b-2 border-b-white/40 items-center rounded-t-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500/20">
                  <div className="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">Third Number</div>
        <input
          name="num3"
          type='text'
          value={nums.num3}
          onChange={handleChange}
          placeholder="Third Word"
          className='block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6'
          
          />
           </div>
          </div>


        <button disabled={isLoading}  className={`${ isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-white/50 hover:bg-blue-700/10"} mt-3 rounded-md px-6 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/10 `} type="submit">
        {isLoading?(
            "Chill small"
        ):(
            "Submit"
        )}
        </button>
      </form>
      <div >

      {result !== null && (
        <h2>
          Result: <TypingAnimation text={String(result)} speed={50} />
        </h2>
      )}

      </div>
    </div>
          </section>
  );
}

export default Form;
