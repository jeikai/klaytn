import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Web3 from "web3";
import {
  tokenContractInstance,
  votingContractInstance,
} from "../service/service";
import Proposal from "../components/Proposal";
import Header from "./Header/Header";
import Infor from "./Infor/Infor";
import Chart from "./Chart/Chart";
import Input from "./Input/Input";
import List from "./List/List";

export default function Home() {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [votingContract, setVotingContract] = useState(null);
  const [addressBalance, setAddressBalance] = useState(null);
  const [balance, setBalance] = useState(null);

  const [amountDeposit, setAmountDeposit] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [description, setDescription] = useState(null);
  const [countProposal, setCount] = useState(0);
  const [yesCount, setYes] = useState(0);
  const [noCount, setNo] = useState(0);
  const [IdProposal, setId] = useState([]);
  const [yes, setYesCount] = useState([]);
  const [no, setNoCount] = useState([]);

  const updateAddressBalance = (e) => {
    setAddressBalance(e.target.value);
  };

  const updateAmountDeposit = (e) => {
    setAmountDeposit(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleConnectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setAddress(accounts[0]);

        const tokenContractInst = tokenContractInstance(web3Instance);
        setTokenContract(tokenContractInst);
        const votingContractInst = votingContractInstance(web3Instance);
        setVotingContract(votingContractInst);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Metamask is not installed! Please install a wallet.");
    }
  };

  const handleGetBalance = async () => {
    const balance = await tokenContract.methods
      .balanceOf(addressBalance)
      .call();
    setBalance(web3.utils.fromWei(balance, "ether"));
    toast.success(
      "Wallet with address: " + addressBalance + " owns " + balance + " ether."
    );
  };

  const handleDeposit = async () => {
    try {
      await tokenContract.methods.deposit().send({
        from: address,
        value: Number(amountDeposit) * 10 ** 18,
      });
    } catch (error) {
      toast.error(error.message);
      setErrorMessage(error.message);
    }
  };

  const handleSumbitProposal = async () => {
    try {
      const allowance = await tokenContract.methods
        .allowance(address, votingContract._address)
        .call();
      if (Number(web3.utils.fromWei(allowance, "ether")) < 20) {
        await tokenContract.methods
          .approve(votingContract._address, BigInt(20 * 10 ** 18))
          .send({
            from: address,
          });
      }

      await votingContract.methods.createProposal(description).send({
        from: address,
      });
    } catch (error) {
      toast.error(error.message);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (votingContract) {
        const proposalCount = await votingContract.methods
          .proposalCount()
          .call();
        setCount(Number(proposalCount));
      }
    }

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, [countProposal, votingContract]);

  useEffect(() => {
    async function fetchData() {
      if (countProposal > 0) {
        votingContract.methods
          .getIdProposal()
          .call()
          .then((result) => {
            setId([])
            const serializedResult = JSON.stringify(result, (key, value) => {
              if (typeof value === "bigint") {
                setId((data) => [...data, Number(value)]);
                return value.toString();
              }
              return value;
            });
          })
          .catch((error) => {
            console.log("Error:", error);
          });

        votingContract.methods
          .getAgree()
          .call()
          .then((result) => {
            setYesCount([])
            const serializedResult = JSON.stringify(result, (key, value) => {
              if (typeof value === "bigint") {
                setYesCount((data) => [...data, Number(value)]);
                return value.toString();
              }
              return value;
            });
          })
          .catch((error) => {
            console.log("Error:", error);
          });
        votingContract.methods
          .getDisagree()
          .call()
          .then((result) => {
            setNoCount([]);
            const serializedResult = JSON.stringify(result, (key, value) => {
              if (typeof value === "bigint") {
                setNoCount((data) => [...data, Number(value)]);
                return value.toString();
              }
              return value;
            });
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
    }
    fetchData();
  }, [countProposal, votingContract]);

  return (
    <div>
      <main>
        <Header handleConnectWallet={handleConnectWallet} address={address} />
        <div className="my-10 mx-5">
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-3">
              <Chart yes={yes} no={no} id={IdProposal} count={countProposal}/>
            </div>
            <Infor address={address} />
          </div>
        </div>
        <div className="my-10 mx-5">
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-3">
              <h1 className="text-white text-4xl font-bold">
                Tổng cộng có {countProposal} đề xuất:
              </h1>
              <div className="relative h-300 overflow-y-auto shadow-md sm:rounded-lg">
                <table className="h-300 o w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tổng số token đồng ý
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tổng số token không đồng ý
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only"></span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {countProposal > 0 &&
                      Array.from({ length: countProposal }, (_, index) => {
                        return (
                          <List
                            votingContract={votingContract}
                            address={address}
                            id={index}
                            key={index}
                            web3={web3}
                            setYes={setYes}
                            setNo={setNo}
                            sum={countProposal}
                          />
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <Input
                label="Số dư của bạn"
                update_data={updateAddressBalance}
                submit={handleGetBalance}
                text_button="Check"
              />
              <Input
                label="Nạp vào contract"
                update_data={updateAmountDeposit}
                submit={handleDeposit}
                text_button="Chuyển"
              />
              <Input
                label="Tạo ra đề xuất mới"
                update_data={updateDescription}
                submit={handleSumbitProposal}
                text_button="Tạo"
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </main>
    </div>
  );
}
