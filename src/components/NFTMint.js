import React, { Component } from 'react'
import caver from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'
import TxResult from 'components/TxResult'

import './NFTMint.scss'

const agContract = new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);

class NFTMint extends Component {
  constructor(props) {
    super(props)

    this.state = {
      from: props.from,
      to: '',
      value: '',
      gas: 3000000,
      txHash: null,
      receipt: null,
      error: null,
      rawTransaction: null,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.from !== prevState.from) {
      return { from: nextProps.from }
    }
    return null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  mintNFT = () => {
    const { from, to, value, gas } = this.state

    // const data = caver.klay.abi.encodeFunctionCall(
    //   {
    //     constant: false,
    //     inputs: [
    //       {
    //         "name": "to",
    //         "type": "address"
    //       }
    //     ],
    //     name: "transferRandom",
    //     outputs: [],
    //     payable: true,
    //     stateMutability: "payable",
    //     type: "function"
    //   },
    //   [
    //     to
    //   ]
    // )

    // caver.klay
    //   .sendTransaction({
    //     type: 'SMART_CONTRACT_EXECUTION',
    //     from,
    //     value,
    //     to,
    //     data,
    //     gas
    //   })
    //   .on('transactionHash', transactionHash => {
    //     console.log('txHash', transactionHash)
    //     this.setState({ txHash: transactionHash })
    //   })
    //   .on('receipt', receipt => {
    //     console.log('receipt', receipt)
    //     this.setState({ receipt: JSON.stringify(receipt) })
    //   })
    //   .on('error', error => {
    //     console.log('error', error)
    //     this.setState({ error: error.message })
    //   })

    let value_01 = caver.utils.toPeb(1, "KLAY");
    agContract.methods.transferRandom(from).send({
      from: from,
      value: value_01,
      gas: '250000'
    })
    .once('transactionHash', (transactionHash) => {
      console.log('txHash', transactionHash)
      this.setState({ txHash: transactionHash })
    })
    .once('receipt', (receipt) => {
      console.log('receipt', receipt)
      this.setState({ receipt: JSON.stringify(receipt) })
    })
    .once('error', (error) => {
      console.log('error', error)
      this.setState({ error: error.message })
    })
  }

  signTransaction = () => {
    const { from, to, value, gas } = this.state

    caver.klay.sendTransaction({
      type: 'VALUE_TRANSFER',
      from,
      to,
      value: caver.utils.toPeb(value.toString(), 'KLAY'),
      gas,
    })
      .once('transactionHash', (transactionHash) => {
        console.log('txHash', transactionHash)
        // this.setState({ txHash: transactionHash })
      })
      .once('receipt', (receipt) => {
        console.log('receipt', receipt)
        // this.setState({ receipt: JSON.stringify(receipt) })
      })
      .once('error', (error) => {
        console.log('error', error)
        // this.setState({ error: error.message })
      })
  }
  
  render() {
    const { from, to, value, gas, txHash, receipt, error } = this.state

    return (
      <div className="NFTMint">
        <div className="QuestionBox">
            <img
              src="images/question.png"
              alt="question box"
              width="400"
              height="400"
            />
        </div>
        <p/>
        <Button
          title="Mint Zodiac"
          onClick={this.mintNFT}
        />
        {/* <TxResult
          txHash={txHash}
          receipt={receipt}
          error={error}
        /> */}
      </div>
    )
  }
}

export default NFTMint
