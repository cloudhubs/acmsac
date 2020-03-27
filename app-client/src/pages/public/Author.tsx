import React, { FunctionComponent } from 'react'; // importing FunctionComponent
import { Person } from '../../model/Person';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Container, Paper, Typography, TableCell, Grid, Box } from "@material-ui/core";
import { Slides } from './Slides';

type AuthorProps = {
  author: Person,
}

export const Author: FunctionComponent<AuthorProps> = ({ author }) => <div>
    
    <Box m={2}>
    <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableBody>
                        <TableRow>
                                <TableCell component="th">
                                Name
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    {author.name}    
                                </TableCell>
                            </TableRow>


                            <TableRow>
                                <TableCell component="th">
                                Affiliation
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    {author.affiliation}    
                                </TableCell>
                            </TableRow>


                            <TableRow>
                                <TableCell component="th">
                                Country
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    {author.country}    
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th">
                                ORCID
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    {author.orcid}    
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th">
                                Linkedin
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    <a href={author.linkedInUrl}>{author.linkedInUrl}</a>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th">
                                Google Scholar
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    <a href={author.googleScholarUrl}>{author.googleScholarUrl}</a>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th">
                                Bio
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    {author.bio}    
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell component="th">
                                Picture
                                </TableCell>
                                <TableCell align="left" scope="row">
                                    <Slides url={author.picUrl} />
                                </TableCell>
                            </TableRow>

                            </TableBody>
                            </Table>
                            </TableContainer>
    </Box>
  
</div>