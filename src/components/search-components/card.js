import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};


class  ImgMediaCard extends React.Component {

     clickHandler(event){
            console.log(event)
            this.props.onClick(event)
        }

 render(){
     const { classes } = this.props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          image="https://live.staticflickr.com/4054/4533044319_6dbb0d7574_z.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.item}
          </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <button value = {this.props.item} size="small" color="primary" onClick = {(event)=>{this.clickHandler(event)}}>
          Add to list
        </button>
      </CardActions>
    </Card>
  );
  }
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);