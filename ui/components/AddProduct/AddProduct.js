import React from "react";
import Modal from "../UI/Modal/Modal";
import classes from "./AddProduct.module.css";
import Select from "../../components/UI/SelectDropdown/Select";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/ProfileInput/ProfileInput";
import { checkValidity } from "../../utils/validators";
import { useState } from "react";
import { useWeb3Context } from "../../context/Web3Context";
import { generateBase64FromImage } from "../../utils/imagePreview";
import { MdCameraAlt, MdFileUpload, MdDownloadDone } from "react-icons/md";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const initialState = {
  title: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "title",
    },
    value: "",
    valid: false,
    touched: false,
    validation: {
      required: true,
    },
  },
  price: {
    elementType: "input",
    elementConfig: {
      type: "number",
      placeholder: "Price",
    },
    value: "",
    valid: false,
    touched: false,
    validation: {
      required: true,
      isNumber: true,
    },
  },
  count: {
    elementType: "input",
    elementConfig: {
      type: "number",
      placeholder: "Available Items",
    },
    value: "",
    valid: false,
    touched: false,
    validation: {
      required: true,
      isNumber: true,
    },
  },
  brand: {
    elementType: "input",
    elementConfig: {
      type: "text",
      placeholder: "brand",
    },
    validation: {
      required: true,
    },
    value: "",
    valid: false,
    touched: false,
  },
  description: {
    elementType: "textarea",
    elementConfig: {
      type: "text",
      placeholder: "description",
    },
    value: "",
    valid: false,
    touched: false,
    validation: {
      required: true,
    },
  },
};

const imageInitialState = {
  preview: false,
  url: "",
  valid: false,
  path: null,
  file: null,
  touched: false,
  validation: {
    require: true,
  },
};

const AddProduct = (props) => {
  const { cart, web3, address } = useWeb3Context();
  const [inputData, setInputData] = useState(initialState);
  const [imageData, setImageData] = useState(imageInitialState);

  const [formIsValid, setFormIsValid] = useState(false);
  const [imageFormIsValid, setImageFormIsValid] = useState(false);

  const previewImage = (event) => {
    const imageElem = { ...imageData };
    imageElem.preview = true;
    setImageData(imageElem);
    const imageUrl = event.target.files;
    generateBase64FromImage(imageUrl[0])
      .then((b64) => {
        const imageElem = { ...imageData };
        // let formIsValid = true;
        imageElem.touched = true;
        imageElem.url = b64;
        imageElem.file = imageUrl[0];
        imageElem.valid = checkValidity(imageElem.url, imageElem.validation);
        setImageData(imageElem);
        // formIsValid = imageElem.valid && formIsValid;
        // setImageFormIsValid(formIsValid);
        // console.log("file", imageElem.file);
      })
      .catch((e) => {
        const imageElem = { ...imageData };
        imageElem.valid = false;
        imageElem.url = null;
        setImageData(imageElem);
      });
  };

  const onUpload = (event) => {
    event.preventDefault();
    const storageRef = ref(storage, `images/${imageData.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageData.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((uri) => {
          let formIsValid = true;
          console.log(uri);
          const imgElem = { ...imageData };
          imgElem.path = uri;
          formIsValid = !!uri && formIsValid;
          setImageFormIsValid(formIsValid);
          setImageFormIsValid(formIsValid);
          setImageData(imgElem);
        });
      },
    );
  };

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

  const inpData = [];
  for (let key in inputData) {
    inpData.push({ config: inputData[key], id: key });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const itemName = web3.utils.asciiToHex(inputData.title.value);
    const itemDetails = inputData.description.value;
    const itemBrand = web3.utils.asciiToHex(inputData.brand.value);
    const itemPrice = inputData.price.value;
    const availableCount = inputData.count.value;
    const imageUrl = imageData.path;
    // const itemType = inputData.type.value;
    const response = await cart.methods
      .addProduct(
        itemName,
        itemPrice,
        availableCount,
        itemDetails,
        itemBrand,
        imageUrl,
      )
      .send({ from: address, gas: 1000000 });
    if (response.status) {
      console.log("status: ", response.status);
      setInputData(initialState);
      setImageData(imageInitialState);
    }
  };

  return (
    <Modal clicked={props.clicked} show={props.show}>
      <section className={classes.Auth}>
        <header className={classes.Header}>
          <h1>Add New Product</h1>
        </header>
        <form className={classes.Form}>
          <div className={classes.FormInputs}>
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
            <label className={classes.ImageBoxLabel}>Add Image</label>
            <div className={classes.ImageBox}>
              <div className={classes.InputBox}>
                <input type="file" onChange={previewImage} />
                <span className={classes.Icon}>
                  <MdCameraAlt />
                </span>
              </div>
              {imageData.url ? (
                <figure className={classes.ImagePreview}>
                  <img src={imageData.url} />
                  <figcaption>
                    <button className={classes.UploadBtn} onClick={onUpload}>
                      {imageData.path ? <MdDownloadDone /> : <MdFileUpload />}
                    </button>
                  </figcaption>
                </figure>
              ) : null}
            </div>
          </div>
          <div className={classes.SubmitBtn}>
            <button
              onClick={submitHandler}
              disabled={!formIsValid || !imageFormIsValid}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default AddProduct;
