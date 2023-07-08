import Chart from "./component/Body/Chart";
import Infor from "./component/Body/Infor";
import Header from "./component/Header/Header";
import Others from "./component/Body/Section";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import {
  tokenContractInstance,
  votingContractInstance,
} from "./service/service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [web3, setWeb3] = useState(null);
  // Địa chỉ đang sử dụng
  const [address, setAddress] = useState(localStorage.getItem("address"));

  const [tokenContract, setTokenContract] = useState(null);
  const [votingContract, setVotingContract] = useState(null);

  const [addressBalance, setAddressBalance] = useState(null);
  const [balance, setBalance] = useState(null);

  const [amountDeposit, setAmountDeposit] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [description, setDescription] = useState(null);
  const [countProposal, setCount] = useState(null);

  const updateAddressBalance = (e) => {
    setAddressBalance(e.target.value);
  };

  const updateAmountDeposit = (e) => {
    setAmountDeposit(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };
console.log(web3)
  const handleConnectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        // Gọi đến ví khi chưa có kết nối
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        //Lấy ra account đang được sử dụng
        const accounts = await web3Instance.eth.getAccounts();
        // Set địa chỉ
        localStorage.setItem("address", accounts[0]);
        const tokenContractInst = tokenContractInstance(web3);
        setTokenContract(tokenContractInst);
        const votingContractInst = votingContractInstance(web3);
        setVotingContract(votingContractInst);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Not install Metamask! Please install wallet");
    }
  };

  const handleGetBalance = async () => {
    console.log(tokenContract);

    const balance = await tokenContract.methods
      .balanceOf(addressBalance)
      .call();
    console.log(
      "🚀 ~ file: index.js:60 ~ handleGetBalance ~ balance:",
      balance
    );
    setBalance(web3.utils.fromWei(balance, "ether"));
  };

  const handleDeposit = async () => {
    try {
      await tokenContract.methods.deposit().send({
        from: address,
        value: Number(amountDeposit) * 10 ** 18,
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSumbitProposal = async () => {
    try {
      const allowance = await tokenContract.methods
        .allowance(address, votingContract._address)
        .call();
      console.log(Number(web3.utils.fromWei(allowance, "ether")) < 20);
      if (Number(web3.utils.fromWei(allowance, "ether")) < 20) {
        console.log(1);
        // await tokenContract.methods
        //   .approve(votingContract._address, BigInt(20 * 10 ** 18))
        //   .send({
        //     from: address,
        //   });
      }
      console.log(2);
      await votingContract.methods.createProposal(description).send({
        from: address,
      });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (votingContract) {
        const proposalCount = await votingContract.methods
          .proposalCount()
          .call();
        console.log(
          "🚀 ~ file: index.js:116 ~ fetchData ~ proposalCount:",
          proposalCount
        );
        setCount(Number(proposalCount));
      }
    }
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  });
  return (
    <div>
      <Header
        handleConnectWallet={handleConnectWallet}
        address={address}
      ></Header>
      <div className="my-10 mx-5">
        <div className="grid grid-cols-4 gap-2">
          <Chart></Chart>
          <Infor address={address}></Infor>
        </div>
      </div>
      <Others
        handleGetBalance={handleGetBalance}
        updateAddressBalance={updateAddressBalance}
      ></Others>
      <ToastContainer />
    </div>
  );
}

export default App;
