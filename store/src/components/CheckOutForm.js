import {useRef} from 'react'

const CheckOutForm = () => {
  const nameInput = useRef('');
  const addressInput = useRef('');
  const emailInput = useRef('');
  return (
    <div>

      <form className="mt-4" id="checkout-form">
      <div className="form-outline form-white mb-4">
        <input type="text" ref={nameInput} class="form-control form-control-lg" size="17"/>
        <label class="form-label">Customers Name</label>
      </div>

      </form>
    </div>
  )
}

export default CheckOutForm