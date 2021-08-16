import React from "react";

import ReactDOM from "react-dom"


const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


class PayPal extends React.Component {

  createOrder(data, actions) {

    return actions.order.create({

      purchase_units: [

        {

          amount: {

            value: this.props.value,

          },

        },

      ],

    });

  }

//   requestForPaidUpdate() {

//     let url = request_formatter({
//       model: "purchased-object",
//       pk: this.props.purchase_id
//     })

//     let headers = BASIC_HEADER
//     headers["Authorization"] = 'token '+this.props.token

//     fetch(url, {
//       method: "PATCH",
//       headers : headers,
//       body: JSON.stringify({isPaid: 1})
//     })
//       .then(() => this.props.handlePaidConfirmation(this.props.item_table_index))
//   }


  onApprove(data, actions) {
    
    // this.requestForPaidUpdate()
    
    return actions.order.capture();

  }


  render() {

    return (

      <PayPalButton

        createOrder={(data, actions) => this.createOrder(data, actions)}

        onApprove={(data, actions) => this.onApprove(data, actions)}

      />

    );

  }

}

export default PayPal