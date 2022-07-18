import React from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Auth.module.css";
import Select from "../../components/UI/SelectDropdown/Select";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/ProfileInput/ProfileInput";
import { checkValidity } from "../../utils/validators";
import { useState } from "react";
import { useWeb3Context } from "../../context/Web3Context";

const initialInputState = {
  name: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "name",
    },
    value: "",
    valid: false,
    touched: false,
    validation: {
      required: true,
    },
  },
  contact: {
    elementType: "input",
    elementConfig: {
      type: "number",
      placeholder: "contact",
    },
    validation: {
      required: true,
      isNumber: true,
    },
    value: "",
    valid: false,
    touched: false,
  },
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      placeholder: "Email",
    },
    value: "",
    valid: false,
    touched: false,
    validation: {
      required: true,
      isEmail: true,
    },
  },
  address: {
    elementType: "textarea",
    elementConfig: {
      type: "text",
      placeholder: "address",
    },
    value: "",
    valid: false,
    touched: false,
    validation: {
      required: true,
    },
  },
};

const initialSelectState = {
  gender: {
    elementType: "select",
    elementConfig: {
      options: ["Male", "Female"],
    },
    value: [],
    valid: false,
    touched: false,
    validation: {
      required: false,
    },
  },
  type: {
    elementType: "select",
    elementConfig: {
      options: ["Buyer", "Seller"],
    },
    value: [],
    valid: false,
    touched: false,
    validation: {
      required: false,
    },
  },
};

const Auth = (props) => {
  const { cart, web3, address } = useWeb3Context();
  const [inputData, setInputData] = useState(initialInputState);
  const [selectData, setSelectData] = useState(initialSelectState);
  const [formIsValid, setFormIsValid] = useState(false);
  const [selectFormIsValid, setSelectFormIsValid] = useState(false);

  const onChangeHandler = (event, identifier) => {
    const updatedInputData = { ...inputData };
    const updatedInputElement = { ...updatedInputData[identifier] };
    updatedInputElement.value = event.target.value;
    updatedInputElement.valid = checkValidity(
      updatedInputElement.value,
      updatedInputElement.validation,
    );
    updatedInputElement.touched = true;
    updatedInputData[identifier] = updatedInputElement;
    let formIsValid = true;
    for (let identifier in updatedInputData) {
      formIsValid = updatedInputData[identifier].valid && formIsValid;
    }
    setInputData(updatedInputData);
    setFormIsValid(formIsValid);
  };

  const selectChangeHandler = (event, identifier) => {
    const updatedSelectData = { ...selectData };
    // console.log("selectChangeHandler", event.target.value);
    const updatedSelectElement = { ...updatedSelectData[identifier] };
    updatedSelectElement.value = [event.target.value];
    updatedSelectElement.valid = updatedSelectElement.value.length !== 0;
    updatedSelectElement.touched = true;
    updatedSelectData[identifier] = updatedSelectElement;
    let selectFormIsValid = true;
    for (let identifier in updatedSelectData) {
      selectFormIsValid =
        updatedSelectData[identifier].valid && selectFormIsValid;
    }
    setSelectData(updatedSelectData);
    setSelectFormIsValid(selectFormIsValid);
  };

  const inpData = [];
  for (let key in inputData) {
    inpData.push({ config: inputData[key], id: key });
  }

  const selData = [];
  for (let key in selectData) {
    selData.push({ config: selectData[key], id: key });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const name = web3.utils.asciiToHex(inputData.name.value);
    const email = web3.utils.asciiToHex(inputData.email.value);
    const contact = inputData.contact.value;
    let gender;
    let type;
    if (selectData.gender.value == "Male") {
      gender = 1;
    } else if (selectData.gender.value == "Female") {
      gender = 2;
    }
    if (selectData.type.value == "Buyer") {
      type = 1;
    } else if (selectData.type.value == "Seller") {
      type = 2;
    }
    const userAddress = inputData.address.value;
    console.log(
      "name :" + name,
      "contact: " + contact,
      "gender: " + gender,
      "email: " + email,
      "addr: " + userAddress,
      "type: " + type,
    );
    const res = await cart.methods
      .userSignup(name, contact, gender, email, userAddress, type)
      .send({ from: address });
    if (res.status) {
      setInputData(initialInputState);
      setSelectData(initialSelectState);
    }
  };

  return (
    <Modal clicked={props.clicked} show={props.show}>
      <section className={classes.Auth}>
        <header className={classes.Header}>
          <h1>Create Profile</h1>
        </header>
        <form className={classes.Form} onSubmit={submitHandler}>
          <div className={classes.FormInputs}>
            {selData.map((data) => {
              const selectClasses = [classes.Select];
              if (
                !data.config.valid &&
                data.config.touched &&
                data.config.validation
              ) {
                selectClasses.push(classes.Invalid);
              }
              return (
                <div className={selectClasses.join(" ")} key={data.id}>
                  <Select
                    options={data.config.elementConfig.options}
                    changed={(event) => {
                      selectChangeHandler(event, data.id);
                    }}
                    selectType="radio"
                    name={data.id}
                    list={data.config.value}
                  />
                </div>
              );
            })}

            {inpData.map((data) => {
              const inputClasses = [classes.Input];
              if (
                !data.config.valid &&
                data.config.touched &&
                data.config.validation
              ) {
                inputClasses.push(classes.Invalid);
              }
              return (
                <div className={inputClasses.join(" ")} key={data.id}>
                  <Input
                    elementType={data.config.elementType}
                    elementConfig={data.config.elementConfig}
                    value={data.config.value}
                    changed={(event) => {
                      onChangeHandler(event, data.id);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className={classes.SubmitBtn}>
            <button disabled={!formIsValid || !selectFormIsValid}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default Auth;
