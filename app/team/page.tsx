'use client'
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layout'
import { ProjectBoard } from '@/components/project-board'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { Select, Option } from '@mui/joy'
import { fetchTeamMemberList, findAllTaskOfTeamMember } from '@/features/task/taskActions'
import SecureStorage from '@/utils/SecureStorage'
import { ToastContainer } from 'react-toastify'

const Team = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { taskList, teamList, loading } = useSelector((state: RootState) => state.task)
    const [teamMember, setTeamMember]= useState<string>('')
    const decoded: any = SecureStorage.getItem('decoded')
    useEffect(() => {
        if (decoded) {

            const body = {
                managerEmail: decoded?.email
            }
            dispatch(fetchTeamMemberList(body))
        }
    }, [])
    useEffect(()=>{
        if(teamMember){
            const body={
                "assignedToEmail": teamMember
            }
            dispatch(findAllTaskOfTeamMember(body))
        } 
    }, [teamMember])
    console.log('teamList', teamList, teamMember, taskList)
    return (
        <>
            <Layout >

                <div className="flex-1 flex-col space-y-4 p-4 md:p-8 pt-6">
                    {/* <div>Team</div> */}
                    <Select
                    value={teamMember}
                    onChange={(e: any, newValue: any)=> {
                        setTeamMember(newValue)
                    }}
                    >
                        {teamList && teamList.results && teamList.results.length> 0 && teamList.results.map((data:any, i:any)=>{
                            return <Option value={data?.email}>{data?.fullName}</Option>

                        })}
                    </Select>
                    <ProjectBoard taskList={taskList} viewOnly={true} />
                   <ToastContainer />
 
                </div>
            </Layout>
        </>
    )
}

export default Team