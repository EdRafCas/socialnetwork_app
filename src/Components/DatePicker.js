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

const years = ["1992","1993","1994"]

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
      border: solid ${theme.BorderColor} 1px;
      /* background:rgba(91, 112, 131, 0.8); */
      opacity:1;
`
const TextContainer =styled.div`
      width:100%;
      display:flex;
      flex-direction:column;
      border: solid ${theme.BorderColor} 1px;
`

const Text =styled.p`
      border: solid ${theme.BorderColor} 1px;
      color: ${theme.Text};
      padding:0.5rem 0rem;
`

const Pickers = styled.div`
      border: solid ${theme.BorderColor} 1px;
      height:3rem;
      width:100%;
      display:flex;
      flex-direction:row;

`
const MonthPicker =styled.div`
      border: solid ${theme.BorderColor} 1px;
      display: flex;
      flex-direction:column;
      position:relative;
      transition: .5s ease all;
      width:40%;
`
const TextLabel=styled.p`
      font-size:11px;
`
const SelectedMonth =styled.div`
      width:100%;
      height:2rem;
      padding:0.5rem;
      display:flex;
      justify-content:space-between;
      align-items:center;
      &:hover {
        background: #2C272E};
`

const YearPicker=styled.div`
      border: solid ${theme.BorderColor} 1px;
      display: flex;
      flex-direction:column;
      position:relative;
      transition: .5s ease all;
      width:40%;
`
const SelectedYear = styled.div`
      width:100%;
      height:2rem;
      padding:0.5rem;
      display:flex;
      justify-content:space-between;
      align-items:center;
      &:hover {
        background: #2C272E};
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

const DatePicker = () => {
      const [currentMonth, changeCurrentMonth] =useState(false);
      const [currentYear, changeCurrentYear] =useState(false);

      const handleClick =(e)=>{
            changeCurrentMonth(e.currentTarget.dataset.value)
      }

      return ( 
            <DatePickerContainer>
                  <TextContainer>
                        <Text>Date of birth</Text>
                        <Text>This will not be shown publicly. Confirm your own age, even if this account is for a business, memes, or something else.</Text>
                  </TextContainer>
                  <Pickers>
                        <MonthPicker>
                              <TextLabel>Month</TextLabel>
                              <SelectedMonth onClick={()=>{changeCurrentMonth(!currentMonth)}}>{currentMonth}</SelectedMonth>
                                    {currentMonth &&
                                          <Options>
                                                {months.map((month)=>{
                                                      return <Option
                                                                  key={month.id}
                                                                  data-value={month.value}
                                                                  onClick={handleClick}
                                                                  >
                                                            {month.value}       
                                                            </Option>
                                                })}
                                          </Options>
                                    }
                        </MonthPicker>
                        <YearPicker>
                              <TextLabel>Month</TextLabel>
                              <SelectedYear onClick={()=>{changeCurrentYear(!currentYear)}}>{currentYear}</SelectedYear>
                                    {currentYear &&
                                          <Options>
                                                {months.map((years)=>{
                                                      return <Option
                                                                  key={years.id}
                                                                  data-value={years.value}
                                                                  onClick={handleClick}
                                                                  >
                                                            {years.value}       
                                                            </Option>
                                                })}
                                          </Options>
                                    }
                        </YearPicker>
                              
                        
                  </Pickers>

            </DatePickerContainer>
       );
}
 
export default DatePicker;