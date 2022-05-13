import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MuiButton from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiAppBar from "@material-ui/core/AppBar";

import Close from "@material-ui/icons/Close";
import AddBox from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";

const AppBar = styled(MuiAppBar)`
  &.MuiAppBar-colorPrimary {
    background-color: #020821;
    color: white;
  }
  padding: 1rem 2rem;

  img.logo {
    height: 32px;
    padding: 8px;
  }
`;

const Card = styled(Paper)`
  margin: 2rem;
  padding: 1rem;

  &.MuiPaper-rounded {
    border-radius: 8px;
  }
  .displaybtn {
    margin: 10rem;
    border: 1px solid #020821;
    background-color: transparent;
    color: #020821;
  }
  .displaybtn:hover {
    background-color: #020821;
    color: white;
  }
  .delete {
    margin-left: auto;
    color: #f50057;
    width: 2rem;
    height: 2rem;
  }
  .add {
    color: #020821;
    width: 2rem;
    height: 2rem;
  }
  .MuiButton-startIcon > img {
    height: 1em;
    object-fit: contain;
    text-transform: lowercase;
  }
  .MuiButton-root {
    margin: 12px;
    border-radius: 8px;
    text-transform: lowercase;
  }
`;

const InputField = styled(TextField)`

.MuiInput-root{
	margin-bottom:.5rem;	
}
.MuiInput-input{
    background-color:white;	
    border-radius:5px;

}
.MuiInput-formControl{
    padding:0.4rem 0.5rem 0 0.5rem;
    background-color:white;	
	   font-size:14px;
}

	@media (max-width: 960px) {
	flex-direction: column;
	.MuiAutocomplete-root {
		width: 100%;
		margin: 12px 0;
	}
	.MuiTextField-root {
		width: 100%;
	}	
`;
const ListGrid = styled(Grid)`
  text-transform: lowercase;
  margin: 0 auto;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  .student {
    background-color: #020821;
    color: white;
  }
  .student:hover {
    background-color: #f2433a;
  }
`;

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [selecteddata, setSelectedData] = useState([]);
  const sendRef = useRef(null);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        document.getElementById("send-message").click();
        event.preventDefault();
        // callMyFunction();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  function addItem() {
    if (inputValue) {
      sendRef?.current?.focus();
      setSelectedData(selecteddata, selecteddata.push(inputValue));
      console.log(selecteddata);
      setInputValue("");
    } else alert("Kindly enter URL");
  }
  const deleteItem = (e) => {
    const name = e;
    setSelectedData(
      selecteddata.filter(function (item) {
        return item !== name;
      })
    );
    alert(`URL : ${e} has been removed from the selection!`);
  };
  var FileSaver = require("file-saver");

  const generateDetails = (e) => {
    e.preventDefault();
    selecteddata.forEach((element, index) => {
      FileSaver.saveAs(
        selecteddata[index],
        selecteddata[index].split("/").pop()
      );
    });
  };

  return (
    <>
      <AppBar position="sticky">
        <Grid container alignItems="center">
          <Typography variant="h6" className="app-title">
            The Converter URL to Image
          </Typography>
        </Grid>
      </AppBar>
      <form onSubmit={generateDetails}>
        <Card>
          <ListGrid container spacing={2}>
            <ListGrid item md={6} xs={10}>
              <InputField
                itemRef={sendRef}
                label="Url"
                fullWidth
                variant="standard"
                name="inputValue"
                placeholder="Enter URls"
                margin="normal"
                maxLength={11}
                InputLabelProps={{
                  shrink: true,
                }}v
                inputProps={{ maxLength:10000000000000000000}}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </ListGrid>

            <ListGrid
              alignItems="center"
              container
              item
              spacing={2}
              md={2}
              xs={2}
            >
              <IconButton
                className="add"
                htmlType="submit"
                aria-label="Add"
                onClick={addItem}
                id="send-message"
              >
                <AddBox />
              </IconButton>
            </ListGrid>
          </ListGrid>

          {selecteddata.map((data) => {
            return (
              <>
                <ListGrid container md={22}>
                  <MuiButton
                    variant="filled"
                    className="student"
                    fullWidth
                    onClick={(e) => {
                      deleteItem(data);
                    }}
                  >
                    <ListGrid item md={8}>
                      {data}
                    </ListGrid>
                    <ListGrid item md={1}>
                      {/* {data.name} */}
                    </ListGrid>
                    <ListGrid item md={1} textAlign="right">
                      <Close />
                    </ListGrid>
                  </MuiButton>
                </ListGrid>
              </>
            );
          })}
        </Card>
        {selecteddata.length >= 1 ? (
          <ListGrid container spacing={4}>
            <MuiButton type="submit" variant="contained" className="displaybtn">
              Download
            </MuiButton>
          </ListGrid>
        ) : null}
      </form>
    </>
  );
};
export default Home;
