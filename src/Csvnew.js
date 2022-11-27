import { useState } from "react";
import './csscsv.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Csvnew() {

  //fetch data from port 5000
  const [text, setData] = useState([]);
  const [table, setTable] = useState();
  const [negative, setNegative] = useState();
  const [none, setNone] = useState();
  const [study, setStudy] = useState();
  const [image, setImage] = useState();

  const [one1, setone1] = useState();
  const [zero1, setzero1] = useState();
  const [zero2, setzero2] = useState();
  const [one2, setone2] = useState();
  const [one3, setone3] = useState();

  const [select, setSelect] = useState();

  let bar = null;
  const labels = ["image", "study", "negative", "none", "1", "0", "0", "1", "1"];

  function get_data() {
    fetch('http://localhost:5000/')
      .then(response => response.json())
      .then(data => setData(data))

    const table = text.map((item) => (
      <tr>
        <td>{item.id}</td>
        <td>{item.PredictionString}</td>
      </tr>
    ));
    setTable(table);

    const csv_predict = text.map((item) => (
      item.PredictionString
    ));

    const csv_id = text.map((item) => (
      item.id
    ));

    //split in id string "_"
    const csv_id_split = csv_id.map((item) => (
      item.split("_")
    ));


    let count_study = 0;
    let count_image = 0;
    let count_negative = 0;
    let count_none = 0;
    let one1 = 0;
    let zero1 = 0;
    let zero2 = 0;
    let one2 = 0;
    let one3 = 0;

    //count negative, none
    for (let i = 0; i < csv_predict.length; i++) {
      if (csv_predict[i].includes("negative")) {
        count_negative++;

      }
      setNegative(count_negative);

      if (csv_predict[i].includes("none")) {
        count_none++;
      }
      setNone(count_none);
    }

    //count study, image
    for (let i = 0; i < csv_id_split.length; i++) {
      if (csv_id_split[i][1] === "study") {
        count_study++;
      }
      setStudy(count_study);
      if (csv_id_split[i][1] === "image") {
        count_image++;
      }
      setImage(count_image);
    }

    //split " "
    const csv_predict_split = csv_predict.map((item) => (
      item.split(" ")
    ));

    //slice 0

    for (let i = 0; i < csv_predict_split.length; i++) {
      if (csv_predict_split[i][1] === "1") {
        one1++;
      }

      if (csv_predict_split[i][2] === "0") {
        zero1++;
      }

      if (csv_predict_split[i][3] === "0") {
        zero2++;
      }
      if (csv_predict_split[i][4] === "1") {
        one2++;
      }
      if (csv_predict_split[i][5] === "1") {
        one3++;
      }
    }
    setone1(String(one1));
    setzero1(String(zero1));
    setzero2(String(zero2));
    setone2(String(one2));
    setone3(String(one3));

    setSelect("sample");

  }

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: [image, study, negative, none, one1, zero1, zero2, one2, one3],
        backgroundColor: [
          "rgb(189, 255, 222)",
          "rgb(189, 255, 222)",
          "rgb(189, 255, 222)",
          "rgb(189, 255, 222)",
          "rgb(189, 255, 222)",
          "rgb(189, 255, 222)",
          "rgb(189, 255, 222)",
          "rgb(189, 255, 222)",
          "rgb(189, 255, 222)",
        ],
      },
    ],
  };

  if (select === 'sample') {
    bar = <Bar data={data} />
  }

  return (
    <center>
      <div className="cssheader">
        <button onClick={get_data}>Show CSV</button>
        <div className="tablecsv">
          <table className="table">{table}</table>
        </div>
      </div>
      <div className="barcss">
        {bar}
      </div>
    </center>
  )
}
