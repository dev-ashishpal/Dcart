import React from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./Auth.module.css";
import Select from "../../components/UI/SelectDropdown/Select";
import Button from "../../components/UI/Button/Button";
// import Select from "../../../UI/SelectDropdown/Select";
import Input from "../../components/UI/ProfileInput/ProfileInput";
// import { checkValidity } from "../../../../util/validators";
import { checkValidity } from "../../utils/validators";
import { useState } from "react";

const Auth = (props) => {
  const [inputData, setInputData] = useState({
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
  });
  const [selectData, setSelectData] = useState({
    gender: {
      elementType: "select",
      elementConfig: {
        options: ["Male", "Female", "Sixer"],
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
  });
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
    console.log("selectChangeHandler", event.target.value);
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

  return (
    <Modal clicked={props.clicked} show={props.show}>
      <section className={classes.Auth}>
        <header className={classes.Header}>
          <h1>Create Profile</h1>
        </header>
        <form className={classes.Form}>
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
