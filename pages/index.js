import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import LonelyHeartForm from "../components/LonelyHeartForm";
import loadDB from "../lib/db.js";

const reducers = {
  form: formReducer
};
const reducer = combineReducers(reducers);
let store = createStore(
  reducer
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default class Index extends React.Component {
  submit = values => {
    const db = loadDB();
    db.then(firestore => {
      firestore
        .collection("lonely-hearts")
        .doc(values.name)
        .set({
          Name: values.name,
          Anthem: values.anthem,
          Crush: values.crush,
          DreamDate: values.dreamdate
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });

      window.alert(JSON.stringify(values, null, 4));
    });
  };

  render() {
    return (
      <Provider store={store}>
        <Layout>
          <div id="header-section">
            <p id="header-tag-line">
              {" "}
              Join <br />
              Subcity Radio's
              <br /> lonely
              <br /> hearts
              <br /> club
            </p>
          </div>
          <br />
          <LonelyHeartForm onSubmit={this.submit} />
          <br />

          <a href="https://subcity.org">
            <img
              src="/static/lonelyheartlogo-01.png"
              alt="subcity lonely hearts logo"
              width="35%"
              className="float"
            />
          </a>

          <a href="https://www.facebook.com/events/448457222356306/">
            <p className="invitation">
              Come to the Vic Bar tonight from 11 to find someone special ...
            </p>
          </a>

          <style global jsx>{`
            .float {
              float: left;
            }
            .invitation {
              color: red;
              text-decoration-line: inherit;
            }

            #header-section {
              display: grid;
              grid-template-columns: 1fr;
            }
            #header-tag-line {
              color: red;
              text-align: center;
              font-size: xx-large;
              margin-block-start: 0em;
              margin-block-end: 0em;
              margin-inline-start: 0px;
              margin-inline-end: 0px;
            }
            @media only screen and (min-width: 350px) {
              #header-tag-line {
                font-size: 2em;
              }
            }

            #question-section {
              display: grid;
            }
          `}</style>
        </Layout>
      </Provider>
    );
  }
}
