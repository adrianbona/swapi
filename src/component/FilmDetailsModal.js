import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import * as PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import DialogContent from '@material-ui/core/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import {Divider} from '@material-ui/core'

import {getSpecie} from '../services/Species'
import {getCharacter} from '../services/Characters'

const styles = theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
    top: {
        padding: theme.spacing.unit * 2,
    },
    dividerFullWidth: {
        margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`,
    },
})

class FilmDetailsModal extends Component {
    state = {
        species: [],
        characters: [],
    }

    componentDidMount = () => {
        this.props.film.species.map((specieUrl) => {
            return getSpecie(specieUrl).then((specie) => {
                this.setState(prevState => ({
                    species: [...prevState.species, specie.name]
                }))
            })
        })

        this.props.film.characters.map((characterUrl) => {
            return getCharacter(characterUrl).then((character) => {
                this.setState(prevState => {
                    prevState.characters.push(character)
                    return {
                        characters: prevState.characters
                    }
                })
            })
        })
    }

    renderCharacters = () => {
        return this.state.characters.map((character, index) => {
            return (
                <Router key={index}>
                    <span style={{marginRight: '5px'}}>
                        <Link to={`/character/${index}`}>{character.name}</Link>
                    </span>
                </Router>
            )
        })
    }

    render = () => {
        const {classes, film, reset} = this.props
        const {species} = this.state

        if (!film) {
            return null
        }

        return (
            <Fragment>
                <MuiDialogTitle disableTypography className={classes.root}>
                    <Typography variant="h6">{film.title}</Typography>
                    <IconButton aria-label="Close" className={classes.closeButton} onClick={reset}>
                        <CloseIcon/>
                    </IconButton>
                </MuiDialogTitle>
                <DialogContent className={classes.top}>
                    <Typography gutterBottom>
                        Director
                    </Typography>
                    <Typography gutterBottom>
                        {film.director}
                    </Typography>
                    <Divider className={classes.dividerFullWidth}/>
                    <Typography gutterBottom>
                        Producer
                    </Typography>
                    <Typography gutterBottom>
                        {film.producer}
                    </Typography>
                    <Divider className={classes.dividerFullWidth}/>
                    <Typography gutterBottom>
                        Episode
                    </Typography>
                    <Typography gutterBottom>
                        {film.episode_id}
                    </Typography>
                    <Divider className={classes.dividerFullWidth}/>
                    <Typography gutterBottom>
                        Released Year
                    </Typography>
                    <Typography gutterBottom>
                        {`${(new Date(film.release_date).getFullYear())}`}
                    </Typography>
                    <Divider className={classes.dividerFullWidth}/>
                    <Typography gutterBottom>
                        Opening Crawl
                    </Typography>
                    <Typography gutterBottom>
                        {film.opening_crawl}
                    </Typography>
                    <Divider className={classes.dividerFullWidth}/>
                    <Typography gutterBottom>
                        Species
                    </Typography>
                    <Typography gutterBottom>
                        {species.join(', ')}
                    </Typography>
                    <Divider className={classes.dividerFullWidth}/>
                    <Typography gutterBottom>
                        Characters
                    </Typography>
                    <Typography gutterBottom>
                        {this.renderCharacters()}
                    </Typography>
                </DialogContent>
            </Fragment>
        )
    }
}

FilmDetailsModal.propTypes = {
    classes: PropTypes.object.isRequired,
    film: PropTypes.object,
    reset: PropTypes.func.isRequired,
}

export default withStyles(styles)(FilmDetailsModal)