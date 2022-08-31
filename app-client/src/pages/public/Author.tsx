import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import { Person } from '../../model/Person';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Container, Paper, Typography, TableCell, Grid, Box } from "@material-ui/core";
import { Slides } from '../../components/paperDetail/Slides';
import Avatar from "@material-ui/core/Avatar";
import {CurrentUser} from "../../model/CurrentUser";
import TextField from "@material-ui/core/TextField";

type AuthorProps = {
  author: Person,
  currentUser: CurrentUser,
  isEditable: boolean,
  setAuthor:(author:any)=>void
}



export const Author: FunctionComponent<AuthorProps> = ({ author, currentUser, isEditable, setAuthor }) => <div>
    
    <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableBody>

                        <TableRow>
                                <TableCell style={{borderBottom: 0}} component="th">
                                Picture
                                </TableCell>
                                <TableCell style={{borderBottom: 0}} align="left" scope="row">
                                    {isEditable?
                                            <TextField fullWidth
                                           value = {author.picUrl}
                                           onChange={(event) => {
                                           const picUrl = event.target.value;
                                           setAuthor((p) => ({...p,picUrl}));
                                   }}
                                  />: <Avatar style={{height: "100px", maxWidth: "100px", width: "100px"}} src={author.picUrl} />}
                                </TableCell>
                            </TableRow>
                            
                        <TableRow>
                                <TableCell style={{borderBottom: 0}} component="th">
                                Name
                                </TableCell>
                                <TableCell style={{borderBottom: 0}} align="left" scope="row">
                                {isEditable?
                                        <TextField fullWidth
                                       value = {author.name}
                                       onChange={(event) => {
                                       const name = event.target.value;
                                       setAuthor((p) => ({...p,name}));
                               }}
                              />: author.name}
                                </TableCell>
                            </TableRow>




                            { !currentUser.blocked &&
                            <TableRow>
                                <TableCell style={{borderBottom: 0}} component="th">
                                    Email
                                </TableCell>
                                <TableCell style={{borderBottom: 0}} align="left" scope="row">
                                 <a href={"mailto:"+author.email}>{author.email}</a>
                                </TableCell>
                            </TableRow>
                            }


                            <TableRow>
                                <TableCell style={{borderBottom: 0}} component="th">
                                Affiliation
                                </TableCell>
                                <TableCell style={{borderBottom: 0}} align="left" scope="row">
                                {isEditable?
                                        <TextField fullWidth
                                       value = {author.affiliation}
                                       onChange={(event) => {
                                       const affiliation = event.target.value;
                                       setAuthor((p) => ({...p,affiliation}));
                               }}
                              />: author.affiliation}
                                    {/*<a href={"mailto:"+author.email}>{author.affiliation}</a>*/}
                                </TableCell>
                            </TableRow>


                            <TableRow>
                                <TableCell style={{borderBottom: 0}} component="th">
                                Country
                                </TableCell>
                                <TableCell style={{borderBottom: 0}} align="left" scope="row">
                                {isEditable?
                                        <TextField fullWidth
                                       value = {author.country}
                                       onChange={(event) => {
                                       const country = event.target.value;
                                       setAuthor((p) => ({...p,country}));
                               }}
                              />: author.country}
                                    {/*<a href={"mailto:"+author.email}>{author.country}</a>*/}
                                </TableCell>
                            </TableRow>
{(author.orcid || isEditable) && (
                            <TableRow>
                                <TableCell style={{borderBottom: 0}} component="th">
                                ORCID
                                </TableCell>
                                <TableCell style={{borderBottom: 0}} align="left" scope="row">
                                {isEditable?
                                        <TextField fullWidth
                                       value = {author.orcid}
                                       onChange={(event) => {
                                       const orcid = event.target.value;
                                       setAuthor((p) => ({...p,orcid}));
                               }}
                              />: <a href={"https://orcid.org/" + author.orcid}>{author.orcid} </a>  }

                                </TableCell>
                            </TableRow>
)}
{(author.linkedInUrl || isEditable) && (
                            <TableRow>
                                <TableCell style={{borderBottom: 0}} component="th">
                                Linkedin
                                </TableCell>
                                <TableCell style={{borderBottom: 0}} align="left" scope="row">
                                {isEditable?
                                        <TextField fullWidth
                                       value = {author.linkedInUrl}
                                       onChange={(event) => {
                                       const linkedInUrl = event.target.value;
                                       setAuthor((p) => ({...p,linkedInUrl}));
                               }}
                              />: <a href={author.linkedInUrl}>{author.linkedInUrl}</a>}

                                </TableCell>
                            </TableRow>
)}
{(author.googleScholarUrl || isEditable) && (
                            <TableRow>
                                <TableCell style={{borderBottom: 0}} component="th">
                                Google Scholar
                                </TableCell>
                                <TableCell style={{borderBottom: 0}} align="left" scope="row">
                                {isEditable?
                                        <TextField fullWidth
                                       value = {author.googleScholarUrl}
                                       onChange={(event) => {
                                       const googleScholarUrl = event.target.value;
                                       setAuthor((p) => ({...p,googleScholarUrl}));
                               }}
                              />:  <a href={author.googleScholarUrl}>{author.googleScholarUrl}</a>}
                                </TableCell>
                            </TableRow>
)}
{(author.bio || isEditable) && (
                            <TableRow>
                                <TableCell style={{borderBottom: 0}} component="th">
                                Bio
                                </TableCell>
                                <TableCell style={{borderBottom: 0}} align="left" scope="row">
                                {isEditable?
                                        <TextField fullWidth
                                       value = {author.bio}
                                       onChange={(event) => {
                                       const bio = event.target.value;
                                       setAuthor((p) => ({...p,bio}));
                               }}
                              />: author.bio}
                                </TableCell>
                            </TableRow>
)}
                            

                            </TableBody>
                            </Table>
                            </TableContainer>

</div>
