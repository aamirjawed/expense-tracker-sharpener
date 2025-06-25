const  { Cashfree, CFEnvironment } = require("cashfree-pg")

const cashfree = new Cashfree(CFEnvironment.SANDBOX, "TEST430329ae80e0f32e41a393d78b923034", "TESTaf195616268bd6202eeb3bf8dc458956e7192a85");


exports.createOrder = async (
    orderId,
    orderAmount,
    orderCurrency = "IND",
    customerId,
    customerPhone
) => {
    try {
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
        const formattedExpiryDate = expiryDate.toISOString()


        const request = {
            order_amount: orderAmount,
            order_currency: orderCurrency,
            order_id: orderId,

            customer_details: {
                customer_id: customerId,
                customer_phone: customerPhone
            },

            order_meta: {
                "return_url": "http://localhost:3000/payment-status" + orderId,
                payment_method: "ccc, upi, nb"

            },
            order_expiry_time: formattedExpiryDate
        };

        const response = await cashfree.PGCreateOrder(request)
        return response.data.payment_session_id
    } catch (error) {
        console.log("Error creating order:", error.message)
    }
};


exports.getPaymentStatus = async (orderId) => {
    try {
        console.log()
        console.log()
        console.log(orderId)
        console.log()
        console.log()


        const resposne = await cashfree.PGOrderFetchPayment(orderId)

        let getOrderResponse = resposne.data
        let orderStatus

        if(
            getOrderResponse.filter((transaction) => transaction.payment_status==='success').length > 0
        ){
            orderStatus="Success"
        }else if(
            getOrderResponse.filter((transaction) => transaction.payment_status==='pending').length > 0
        ){
            orderStatus='Pending'
        }else{
            orderStatus="Failure"
        }

        return orderStatus
    } catch (err) {

    }
}