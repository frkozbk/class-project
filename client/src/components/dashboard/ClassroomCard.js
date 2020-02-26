import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle,Button } from 'reactstrap'
import { Link } from 'react-router-dom'

const colors = [
  {
    mainColor: '#b21f66',
    fontColor: '#ffffff'
  }
]
export const ClassroomCard = ({name,id,avatar,teacherName}) => {
  return (
    <Card>
      <div style={{
        height:'100px',
        backgroundColor:colors[0].mainColor
      }}>
        <CardTitle>
          <span 
            className="cardTitle" 
            style={{color:colors[0].fontColor}}
          >
            <Link to={`/classroom/${id}`}>{name}</Link>
          </span>
        </CardTitle>
        <CardSubtitle>
          <span 
            className="cardSubTitle" 
            style={{color:colors[0].fontColor}}
          >
            {teacherName}
          </span>
        </CardSubtitle>
      </div>
      <CardBody>
        <Button className="dashboardButton" color="primary" size="md" block>Sınıf Dashboardına git</Button>
      </CardBody>
    </Card>
  )
}
