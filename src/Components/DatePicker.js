import React,{useState} from "react";
import styled from "styled-components";
import theme from "../Theme.js"

const months =[
      {id:1, value:"January", days:31},
      {id:2, value:"February", days:29},
      {id:3, value:"March", days:31},
      {id:4, value:"April", days:30},
      {id:5, value:"May", days:31},
      {id:6, value:"June", days:30},
      {id:7, value:"July", days:31},
      {id:8, value:"August", days:31},
      {id:9, value:"September", days:30},
      {id:10, value:"October", days:31},
      {id:11, value:"November", days:30},
      {id:12, value:"December", days:31},
]


const DatePickerContainer =styled.div`
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      width:100%;
      height:100%;
      padding:0rem;
      /* margin-top:-50px;
      margin-left:-200px; */
      /* border: solid ${theme.BorderColor} 1px; */
      /* background:rgba(91, 112, 131, 0.8); */
      opacity:1;
`
const TextContainer =styled.div`
      width:100%;
      display:flex;
      flex-direction:column;
      /* border: solid ${theme.BorderColor} 1px; */
`

const Text =styled.p`
      /* border: solid ${theme.BorderColor} 1px; */
      color: ${theme.Text};
      padding:0.5rem 0rem;
`

const Pickers = styled.div`
      /* border: solid ${theme.BorderColor} 1px; */
      height:3rem;
      width:100%;
      display:flex;
      flex-direction:row;
      justify-content:space-between;

`
const TextLabel=styled.p`
      font-size:11px;
`
const MonthPicker =styled.div`
      display: flex;
      flex-direction:column;
      padding:0.2rem 0rem 0.2rem 0.3rem;
      position:relative;
      transition: 0;
      width:55%;
      border-width: 2px;
      border-radius:5px;
      border-style: inset;
      border-color: rgb(118, 118, 118) rgb(133, 133, 133);
      :focus-within{
            border-color:white;
      }

      
`

const Selected =styled.input`
      width:100%;
      height:2rem;
      display:flex;
      border:none;
      justify-content:space-between;
      align-items:center;
      background:none;
      color:${theme.Text};
      :focus{
            outline:none;
      }
      &:hover {
        background: #2C272E};
`

const DayPicker=styled.div`
      display: flex;
      flex-direction:column;
      position:relative;
      padding:0.2rem 0rem 0.2rem 0.3rem;
      transition: .5s ease all;
      width:15%;
      border-width: 2px;
      border-radius:5px;
      border-style: inset;
      border-color: rgb(118, 118, 118) rgb(133, 133, 133);
      &:focus{
            border-color: white;
     
     }
`
const YearPicker=styled.div`
      display: flex;
      flex-direction:column;
      position:relative;
      padding:0.2rem 0rem 0.2rem 0.3rem;
      transition: .5s ease all;
      width:20%;
      border-width: 2px;
      border-radius:5px;
      border-style: inset;
      border-color: rgb(118, 118, 118) rgb(133, 133, 133);
`
const Options=styled.div`
      background:#000;
      border: solid ${theme.BorderColor} 1px;
      position:absolute;
      top:48px;
      width:100%;
      border-radius:10px;
      max-height:150px;
      overflow-y:auto;
`
const Option = styled.div`
      color:${theme.Text};
      height:2rem;
      padding:0.5rem;
      &:hover {
            background: #2C272E};
`

const DatePicker = ({birthMonth, changeBirthMonth, birthDay, changeBirthDay, birthYear, changeBirthYear}) => {
      
      const [showMonth, changeShowMonth] =useState(false);
      const [showDay, changeShowDay] =useState(false);
      const [showYear, changeShowYear] =useState(false);

      const handleClick =(e)=>{
            if(e.currentTarget.dataset.type ==="month"){
                  changeShowMonth(false)
                  changeBirthMonth(e.currentTarget.dataset.value)
            }
            if(e.currentTarget.dataset.value==="February" && birthDay >29){
                  changeShowMonth(false)
                  changeBirthDay(false)
                  changeBirthMonth(e.currentTarget.dataset.value)
            }
            if(e.currentTarget.dataset.type ==="day"){
                  changeShowDay(false)
                  changeBirthDay(e.currentTarget.dataset.value)
            }
            if(e.currentTarget.dataset.type ==="year"){
                  changeShowYear(false)
                  changeBirthYear(e.currentTarget.dataset.value)
            }
            
      }

      const year = (new Date().getFullYear())-100;
      const years = Array.from(new Array(100), (v, idx) => year + idx);

      
      const daysArray = Array.from(new Array(31), (v, idx) => 1 +idx)
      const daysArrayLapse = Array.from(new Array(29), (v, idx) => 1 +idx)


      return ( 
            <DatePickerContainer>
                  <TextContainer>
                        <Text>Date of birth</Text>
                        <Text>This will not be shown publicly. Confirm your own age, even if this account is for a business, memes, or something else.</Text>
                  </TextContainer>
                  <Pickers>
                        <MonthPicker>
                              <TextLabel>Month</TextLabel>
                              <Selected
                                    onClick={()=>{changeShowMonth(!showMonth)
                                                changeShowDay(false);
                                                changeShowYear(false)}}
                                    value={birthMonth}
                                    readOnly
                              />
                              {showMonth &&
                                    <Options>
                                          {months.map((month)=>{
                                                return <Option 
                                                            data-type={"month"}
                                                            key={month.id}
                                                            data-value={month.value}
                                                            onClick={handleClick}>
                                                      {month.value}       
                                                      </Option>
                                          })}
                                    </Options>
                              }
                        </MonthPicker>
                        <DayPicker>
                              <TextLabel>Day</TextLabel>
                              <Selected 
                                    onClick={()=>{changeShowMonth(false);
                                                changeShowDay(!showDay);
                                                changeShowYear(false)}}
                                    value={birthDay}
                                    readOnly
                              />
                              {showDay && birthMonth!=="February" ?
                                    <Options>
                                          {daysArray.map((day)=>{
                                                return <Option 
                                                            key={day}
                                                            data-type={"day"}
                                                            data-value={day}
                                                            onClick={handleClick}>
                                                      {day}       
                                                      </Option>
                                          })}
                                    </Options>
                              :showDay && birthMonth==="February" ?
                                    <Options>
                                          {daysArrayLapse.map((day)=>{
                                                return <Option 
                                                            key={day}
                                                            data-type={"day"}
                                                            data-value={day}
                                                            onClick={handleClick}>
                                                      {day}       
                                                      </Option>
                                          })}
                                    </Options>
                              :""
                              }
                        </DayPicker>
                        <YearPicker>
                              <TextLabel>Year</TextLabel>
                              <Selected 
                                    onClick={()=>{changeShowMonth(false);
                                                changeShowDay(false);
                                                changeShowYear(!showYear)}}
                                    value={birthYear}
                                    readOnly
                              />
                              {showYear &&
                                    <Options>
                                          {years.map((year)=>{
                                                return <Option
                                                            key={year}
                                                            data-type={"year"}
                                                            data-value={year}
                                                            onClick={handleClick}>
                                                            {year}       
                                                      </Option>
                                          })};
                                    </Options>
                              }
                        </YearPicker>
                  </Pickers>
            </DatePickerContainer>
       );
}
 
export default DatePicker;