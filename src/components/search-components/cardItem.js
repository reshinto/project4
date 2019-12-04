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


class  ImgMediaCardItem extends React.Component {

     clickHandler(event){
        console.log('EVENT TARGET!!!!')
             console.log(event.target)
            this.btn.setAttribute("disabled", "disabled");
            this.props.onClick(event)
        }

 render(){
     const { classes } = this.props;

     console.log('CARD PROPSSSSS')
     console.log(this.props)

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          className={classes.media}
          height="140"
          image={this.props.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.item.value}
          </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <button value = {JSON.stringify(this.props.item)} size="small" color="primary" onClick = {(event)=>{this.clickHandler(event)}} ref={btn => { this.btn = btn; }} >
          Add to list
        </button>
      </CardActions>
    </Card>
  );
  }
}

ImgMediaCardItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCardItem);