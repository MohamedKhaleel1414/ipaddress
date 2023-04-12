import React,{useState} from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import "./formStyle.css";
import Map from './Map'

function Form() {
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
  
    const IPFormik = useFormik({
      initialValues: {
        ip: "",
      },
      validationSchema: yup.object().shape({
        ip: yup.string().required("must enter ip address"),
      }),
      onSubmit: (value) => {
        axios
          .get(
            `https://geo.ipify.org/api/v2/country,city?apiKey=at_O9O4BZyDDj2Sa7j1vTM2AyYsWKqoi&ipAddress=${value.ip}`
          )
          .then((res) => {
            console.log(res.data);
            setLat(res.data.location.lat);
            setLng(res.data.location.lng);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={IPFormik.handleSubmit}>
          <label>Enter IP Address:</label>
          <input
            className="input"
            type="text"
            name="ip"
            value={IPFormik.values.ip}
            onChange={IPFormik.handleChange}
            onBlur={IPFormik.handleBlur}
          />
          {IPFormik.errors.ip && (
            <small style={{ color: "red" }}>{IPFormik.errors.ip}</small>
          )}
          <button
            className="button"
            type="submit"
            disabled={!IPFormik.isValid && IPFormik.touched}
          >
            Search for location
          </button>
        </form>
      </div>
      <Map latitude={lat} longtitude={lng}/>
    </>
  );
}

export default Form;
