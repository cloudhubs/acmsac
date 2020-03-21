import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton, Tooltip, Fab, List, Divider } from '@material-ui/core';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import {useGlobalState} from "../state";
import DeleteIcon from '@material-ui/icons/Delete';
import RepositoryForm from './RepositoryForm';
import AddIcon from '@material-ui/icons/Add';
import { ReqConfigSingle } from '../data/ReqConfigSingle';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      // maxWidth: 410,
      backgroundColor: theme.palette.background.paper,
    },
    fab: {
      margin: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export default function ConfigList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);
  const [vConfigMultiple, uConfigMultiple] = useGlobalState('configMultiple');
  const [vProphetAppData, uProphetAppData] = useGlobalState('prophetAppData');
  const [vLoading, uLoading] = useGlobalState('loading');

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const onRemove = (index: number) => {
      if (vConfigMultiple.length > 1){
        let newVal =JSON.parse(JSON.stringify(vConfigMultiple));
        newVal.splice(index, 1);
        uConfigMultiple(newVal);
      }
  }

  const onAdd = () => {
    let newVal = JSON.parse(JSON.stringify(vConfigMultiple));
    newVal[newVal.length] = new ReqConfigSingle();
    console.log(newVal);
    uConfigMultiple(newVal);
  }
  

  const onAnalyze = async () => {

    console.log(vConfigMultiple);
    let val = true;
    uLoading(val);
    const requestBody = {
      "repositories": JSON.parse(JSON.stringify(vConfigMultiple))
    }
    const response = await fetch('http://localhost:8080/', {
      method: 'post',
      body: JSON.stringify(requestBody),
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*'
       }
    });
    if (response != null){
      const body = await response.json();
      uProphetAppData(body);
      console.log(body);
      val = !val;
      uLoading(val);
    }
  }

  return (
    <>
    <List className={classes.root}>

      {vConfigMultiple.map((cm, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <>
          <ListItem key={index} role={undefined} dense button>
            {/* <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon> */}
            <ListItemText id={labelId} >
              <RepositoryForm index={index} key={index}/>
            </ListItemText>
            {/* <ListItemText id={labelId} primary={`Monolith`}></ListItemText> */}
            <ListItemIcon>

              <Tooltip title="Monolith">
              <Checkbox
                    edge="start"
                    // checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}/>
              </Tooltip>
            </ListItemIcon>
            <ListItemSecondaryAction>
              <Tooltip title="Remove">
                <IconButton edge="end" aria-label="comments" onClick={(e) => onRemove(index)}>
                  <DeleteIcon/>
                </IconButton>
              </Tooltip>

            </ListItemSecondaryAction>
          </ListItem>
          {index !== vConfigMultiple.length -1 &&
            <Divider light/>
          }
          </>

        );
      })}

    </List>
    <Tooltip title="More Repositories" aria-label="add">
      <Fab color="primary" className={classes.fab} onClick={onAdd} size="small">
        <AddIcon />
      </Fab>
    </Tooltip>

    <Fab variant="extended" onClick={onAnalyze}>
        <NavigationIcon className={classes.extendedIcon} />
        Analyze
      </Fab>
    </>
  );
}
