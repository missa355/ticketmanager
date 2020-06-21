/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios"

import AllTickets from "../views/AllTickets"

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

class Dashboard extends Component {

  state = {
    NumberOfTickets:0,
    Resolved: 0,
    Unresolved: 0,
    Urgent: 0
  }

  componentDidMount = () => {
    if(localStorage.getItem("SelectedProject") !== null){
      axios.get(`http://localhost:8080/api/Ticket/projects/${localStorage.getItem("SelectedProject")}`)
          .then(res => {
              this.setState({NumberOfTickets:res.data.length})
              var resloved = 0;
              var unresloved = 0;
              var urgent = 0;

              for(var i=0; i<res.data.length; i++){
                if(res.data[i].status !== "resloved"){
                  unresloved++;
                }
                if(res.data[i].status === "resolved"){
                  resloved++;
                }
                if(res.data[i].status === "urgent"){
                  urgent++;
                }

              }
              this.setState({Resolved:resloved, Unresolved:unresloved, Urgent:urgent})
            // for(var i=0; i<res.data.length; i++){
            //   this.setState({tdArray:[...this.state.tdArray, [res.data[i].category, "1224879671", res.data[i].creatorName, 
            //   res.data[i].priority,  res.data[i].status, res.data[i].dateCreated, "Issue.png"] ]})
    
            //   this.setState({tids:[...this.state.tids, res.data[i].tid]})
            // }
  
            // console.log(this.state)
  
            }
          )
      }
  }


  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content" style={{backgroundColor:"#171F24"}}>
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-ticket" />}
                statsText="Tickets filed"
                statsValue={this.state.NumberOfTickets}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-ticket" />}
                statsText="Tickets Resolved"
                statsValue={this.state.Resolved}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-ticket" />}
                statsText="Unresolved Tickets"
                statsValue={this.state.Unresolved}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-ticket" />}
                statsText="Urgent Tickets"
                statsValue={this.state.Urgent}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Ticket Statistics"
                category="Last Week Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Card
                id="chartActivity"
                title="Categories"
                category="All Ticket countes by category"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(legendBar)}</div>
                // }
              />
            </Col>

            <Col md={8}>
              <Card
                title="Ticket Logs"
                // category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width"  style={{overflowY: 'scroll', maxHeight:"320px"}}>
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                    title="Tickets"
                    category="All Departments"
                    stats="Updated 3 minutes ago"
                    statsIcon="fa fa-history"
                    content={
                      <AllTickets/>
                    }
                  />           
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
