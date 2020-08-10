import React ,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Tabs(props) {
  const classes = useStyles();
  const [mainCategories, setMainCategories] = useState([]);
  const keyforEndPoint =props.mainCat;
 const history = useHistory();

  const fetchData = ()  => {
    const mainCategoriesApiEndPoint = 'http://localhost:8050/api/v1/category/'+keyforEndPoint+'/subcategory'
    
    console.log(props)
    console.log("inside tabs")
    const response =  axios.get(mainCategoriesApiEndPoint)
    .then(response => response.data)
    .then((data) => {
        setMainCategories(data);
        console.log("Fetch call")
        console.log(data)
    })
    console.log(mainCategories)
  }
  useEffect(() => {
      fetchData()
  },[])


  function handleClick(singleSub){
    history.push(`/AudioSubCategory/Text%20Books/${singleSub.singleSub}/`)
    window.location.reload(true);
      console.log(singleSub)
      console.log("inside handleclick")
  }

  return (
    
     <div className={classes.root}>
       {console.log(mainCategories)}
        {mainCategories.map(singleSub=>(
            <Button color="primary" onClick={() => handleClick({singleSub})} activeClassName="current">{singleSub}</Button>
        ))}
     </div>
  );
}