import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import { Person } from '../../model/Person';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Container, Paper, Typography, TableCell, Grid, Box } from "@material-ui/core";

type SlidesProps = {
  url: string,
}
function getFrame(url){
  return '<iframe src="' + url +'" width="620" height="530"></iframe>';
}

export const Slides: FunctionComponent<SlidesProps> = ({ url }) => <div>
    
    <div  className="paperInner">
                                <div dangerouslySetInnerHTML={{__html: getFrame(url)}} />
                            </div>
    
  
</div>