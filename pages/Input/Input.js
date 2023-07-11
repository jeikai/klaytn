export default function ({label, update_data, submit, text_button}) {
  return (
    <section>
      <div className="container mx-auto">
        <div className="mb-4">
          <label className="text-lg font-bold text-white">{label}</label>
          <div className="flex">
            <input
              className="border border-gray-300 rounded px-2 py-1 flex-grow"
              type="type"
              placeholder="Enter address to check balance.."
              onChange={update_data}
            />
          </div>
          <button
            onClick={submit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
          >
            {text_button}
          </button>
        </div>
      </div>
    </section>
  );
}
