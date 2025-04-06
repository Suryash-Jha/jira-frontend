'use client'

import { Box, Button,  CssBaseline, CssVarsProvider, Input, Stack, Step, stepClasses, StepIndicator, stepIndicatorClasses, Stepper, Typography } from '@mui/joy'
import React, {useState} from 'react';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const StepperComp = ({activeTab}: any) => {
  return (
    <Stepper sx={{ alignContent: 'center', width: '80%' }}>
      <Step
        indicator={
          <StepIndicator variant={activeTab===1 ? "solid": "outlined"} color="neutral">
            1
          </StepIndicator>
        }
      >
        Email To
      </Step>
      <Step indicator={<StepIndicator variant={activeTab===2 ? "solid": "outlined"} >2</StepIndicator>}>
        Subject
      </Step>
      <Step indicator={<StepIndicator variant={activeTab===3 ? "solid": "outlined"} >3</StepIndicator>}>
        Mail Content
      </Step>
      <Step indicator={<StepIndicator variant={activeTab===4 ? "solid": "outlined"} >4</StepIndicator>}>
        Attachments
      </Step>
      <Step indicator={<StepIndicator variant={activeTab===5 ? "solid": "outlined"} >5</StepIndicator>}>Review and Send</Step>
    </Stepper>
  )
}
const QuestionForm = ({activeTab}:any) => {
  const getQuestionContent= (activeTab:any)=>{
    console.log(activeTab, "activeTab")
    switch (Number(activeTab)){
      case 1: return(
        <>
        <Typography level='h3'> Enter the Email Address to send mail to</Typography>
        <Input name='toEmail' placeholder='Enter Mail ID'> </Input> 
        </>
      )
      case 2: return(
        <>
        <Typography level='h3'> Enter Subject of mail</Typography>
        <Input name='subject' placeholder='Response Placeholder'> </Input> 
        </>
      )
      case 3: return(
        <>
        <Typography level='h3'> Enter Mail Content</Typography>
        <Input name='content' placeholder='Response Placeholder'> </Input> 
        </>
      )
      case 4: return(
        <>
        <Typography level='h3'> Attachments, If any!</Typography>
        <Input name='attachments' type="file" placeholder='Response Placeholder'> </Input> 
        </>
      )
      case 5: return(
        <>
        <Typography level='h3'> Review </Typography>
        <Input type="submit">Send Mail </Input> 
        </>
      )
      default: 
      return(
        <>
        <Typography level='h3'> On the way</Typography>
        <Input placeholder='Response Placeholder'> </Input> 
        </>
      )

    }
  }
  return (
    <Box sx={{
      border: '2px solid black',
      minHeight: '50%',
      minWidth: '80%',
      background: '#cccccc',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {getQuestionContent(activeTab)}
      

    </Box>
  )
}

const TabChanger = ({activeTab, setActiveTab}:any) => {
  return (
    <Stack width={'80%'} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
      <Button color="warning" style={{ minWidth: '15%' }} onClick={()=> activeTab> 1 && setActiveTab(activeTab-1)}> {"<"} Back </Button>
      <Button color="primary"  style={{ minWidth: '15%' }} onClick={()=> activeTab< 5 && setActiveTab(activeTab+1)}> Move Forward {">"} </Button>
    </Stack>
  )
}
const index = () => {
  const [activeTab, setActiveTab]= useState<any>(1);
  const [formData, setFormData]= useState<any>({});
  return (
    <CssVarsProvider>
      <CssBaseline />
      <Box sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#8a2be2'
      }}>

        <Box sx={{
          background: '#faebd7',
          height: '60%',
          width: '80%',
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Typography level='h1'> Email Form</Typography>
          <StepperComp activeTab={activeTab}/>
          <QuestionForm activeTab={activeTab} />
          <TabChanger setActiveTab={setActiveTab} activeTab={activeTab}/>


        </Box>
      </Box>
    </CssVarsProvider>
  )
}

export default index