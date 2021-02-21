import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Button} from "@material-ui/core";
import MessageIcon from '@material-ui/icons/Message';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        leftPadding: {
            padding: '6px'
        }
    }),
);

type TransitionProps = {
    givenOpen: boolean
}

export default function TransitionsModal<TransitionProps> ({givenOpen}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(givenOpen);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    /* TODO: update this probably */
    return (
        <div>
            <Button className="highlightButton" variant="outlined" onClick={handleOpen}>
                 <span className={classes.leftPadding}>{'Chair Conference Message'}</span><MessageIcon />
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Conference Chair Message</h2>

                        <p>On behalf of the Organizing Committee, we are supposed to welcome you to the 35th Annual ACM Symposium on Applied Computing (SAC 2020) in Brno, Czech Republic,
                            hosted by the Red Hat Czech, Czech Technical University and Masaryk University. However, the unexpected spreading of Corona Virus prohibited our hard work from
                            attending this traditionally face-to-face conference. In order to provide a platform for all of the authors to share their valuable research experience and results,
                            our conference co-chair established
                            a website for all authors to download their video presentation. We hope that you will still enjoy this online presentation
                            and share your comments and questions through the asynchronous communication.</p>

                        <p>It has been a great pleasure to working with all of you and learning so much from each of you. All of the SAC organizing committee members wish you be healthy in this virus disaster moment.</p>

                        <p>Sincerely,</p>
                        <p>Chih-Cheng Hung, ACM SAC 2020 Conference Chair</p>
                        <p>Tomas Cerney, ACM SAC 2020 Conference Co-Chair</p>

                        <p>March 29, 2020</p>

                            <p>PS: The following information is for the renewal of the ACM SAC and for the new participants.</p>

                                <p>Purpose: This international forum has been dedicated to computer scientists, engineers and practitioners
                                    for the purpose of presenting their research findings and results in various areas of applied computing.
                                    The organizing committee is grateful for your participation in this exciting international event. We hope
                                    that this conference proves interesting and beneficial for all of you.</p>

                                    <p>Sponsor: The Symposium is sponsored by the ACM Special Interest Group on Applied Computing (SIGAPP),
                                        whose mission is to further the interests of computing professionals engaged in the design and development
                                        of new computing applications, interdisciplinary applications areas, and applied research.
                                        This conference is dedicated to the study of applied computing research of real-world problems.
                                        In addition, this event provides an avenue to discuss and exchange new ideas in the wide spectrum
                                        of applied computing areas. We all recognize the importance of updating the latest developments
                                        and research in our current areas of expertise.</p>

                                        <p>Acknowledgment: SAC 2020 offers Technical Tracks and Poster Sessions.
                                            The success of the conference can be attributed to the substantial
                                            contribution of dedicated Track Chairs and Co-Chairs. Each track maintains a
                                            program committee and a set of highly qualified reviewers. We wish to thank the Track Chairs,
                                            Co-Chairs, Committee Members and participating reviewers for their hard work and effort to make
                                            the SAC 2020 conference a high quality conference. Most of all, I would like to especially thank
                                            the authors and presenters for sharing their experience with the rest of us and to all attendees
                                            through online presentation. The local organizing committee has been a major contributor to the
                                            success of the SAC 2020 conference. Our gratitude goes to the local arrangement team, led by Tomas Cerney
                                            (Conference Co-Chair), including Vaclav Vashek Matyas (Tutorial Chair), Dana Machova (Local Arrangement Co-Chair),
                                            Katerina Klatilova (Local Arrangement Co-Chair), Matej Hrusovsky (Local Arrangement Co-Chair) and Miroslav Bures
                                            (Posters Co-Chair). We also extend our thanks to the Publication Chair, Hossain Shahriar, Kennesaw State University,
                                            USA, for his tremendous effort in putting together the conference proceedings, and Posters Co-Chair, Alessio Bechini,
                                            University of Pisa, Pisa, Italy, for his hard work to select high-quality Posters. Our thanks also go to SRC Chair Armin R. Mikler,
                                            Publicity Co-Chairs Junyoung Heo, Juw Won Park, and Eunjee Song, and Treasurer John Kim. A special thanks to our Program Chairs,
                                            Dongwan Shin, New Mexico Tech, Socorro, New Mexico, USA, and Alessio Bechini, University of Pisa, Pisa, Italy, for coordinating
                                            and bringing together an excellent Technical Program. It is highly appreciated for the financial support of the ACM SIGAPP Chair,
                                            Jiman Hong, for our Student Travel Award Program (STAP) although none of them can attend due to the virtual mode.</p>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
