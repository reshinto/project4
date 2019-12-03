import React from "react";
// core components
import Card from "./Card.js";
import CardBody from "./CardBody.js";
import CardHeader from "./CardHeader.js";
import Quote from "../Typography/Quote.js";

export default function CardQuote() {
  return (
    <Card>
      <CardHeader color="primary">Quote</CardHeader>
      <CardBody>
        <Quote
          text='"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."'
          author="Someone famous in Source Title"
        />
      </CardBody>
    </Card>
  );
}