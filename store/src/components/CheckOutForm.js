import {useRef, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import OrderContext from  '../context/OrderContext';

const CheckOutForm = () => {
  const {order,createOrder} = useContext(OrderContext);
  const navigate = useNavigate();
  const nameInput = useRef('');
  const addressInput = useRef('');
  const emailInput = useRef('');
  async function formHandler(event){
    event.preventDefault();
    const details  = {
      name: nameInput.current?.value,
      address: addressInput.current?.value,
      email: emailInput.current?.value,
      cart: order.cartId
    }
    const response = await createOrder(details);

    if(response){
      navigate("/confirm");
    }

  }
  return (
    <div className='check-out-form'>
            <h2>Billing</h2>
      <form className="mt-4" id="checkout-form" onSubmit={formHandler}>
        <div className="form-outline form-white">
          <label className="form-label">Customers Name</label>
          <input type="text" ref={nameInput} className="form-control form-control-lg" size="17"/>
        </div>
        <div className="form-outline form-white">
          <label className="form-label">Address</label>
          <input type="text" ref={addressInput} className="form-control form-control-lg" size="17"/>
        </div>
        <div className="form-outline form-white">
          <label className="form-label">Email</label>
          <input type="text" ref={emailInput} className="form-control form-control-lg" size="17"/>
        </div>
        <div className="button-outline">
          <input type="submit"  className="btn btn-success" value="Complete Order"/>
        </div>
      </form>
    </div>
  )
}

export default CheckOutForm