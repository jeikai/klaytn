import React, { useState, useEffect } from "react";
import "./List.css";
function List({ id, votingContract, address, web3, sum, setYes, setNo }) {
  // Lưu trữ thông tin đề xuất
  const [proposalInfo, setProposalInfo] = useState(null);
  // Lưu lại kết quả của đề xuất
  const [resultProposal, setResult] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const proposal = await votingContract.methods.proposals(id).call();
      setProposalInfo(proposal);
      const result = await votingContract.methods.resultProposal(id).call();
      setResult(result);
    }

    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchData() {
    const last = await  votingContract.methods.proposals(sum - 1).call();
    setYes(Number(web3.utils.fromWei(last.yesCount, "ether")));
    setNo(Number(web3.utils.fromWei(last.noCount, "ether")));
    }
    fetchData();
  }, [])
  async function handleVote(value) {
    await votingContract.methods.castVote(id, value).send({
      from: address,
    });
  }

  async function handleFinalize() {
    await votingContract.methods.finalizeProposal(id).send({
      from: address,
    });
    const last = await votingContract.methods.proposals(sum - 1).call();
    setYes(Number(web3.utils.fromWei(last.yesCount, "ether")));
    setNo(Number(web3.utils.fromWei(last.noCount, "ether")));
  }

  return (
    <>
      {proposalInfo && (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {id + 1}
          </th>
          <td className="px-6 py-4">{proposalInfo.description}</td>
          <td className="px-6 py-4">
            {Number(web3.utils.fromWei(proposalInfo.yesCount, "ether"))}
          </td>
          <td className="px-6 py-4">
            {Number(web3.utils.fromWei(proposalInfo.noCount, "ether"))}
          </td>
          <td className="px-6 py-4">
            {proposalInfo.timestamp >
            Math.floor(new Date().getTime() / 1000) ? (
              <>
                <button
                  onClick={() => handleVote(true)}
                  classNameName="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3 mr-5"
                >
                  Đồng ý
                </button>
                <button
                  onClick={() => handleVote(false)}
                  classNameName="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3"
                >
                  Không đồng ý
                </button>
              </>
            ) : resultProposal == 0 ? (
              <button onClick={handleFinalize} classNameName=" button is-primary">
                Kết thúc
              </button>
            ) : (
              <p classNameName=" mt-3">
                {Number(web3.utils.fromWei(proposalInfo.yesCount, "ether")) >
                Number(web3.utils.fromWei(proposalInfo.noCount, "ether"))
                  ? "Đề xuất được thông qua"
                  : "Đề xuất bị từ chối"}
              </p>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

export default List;
