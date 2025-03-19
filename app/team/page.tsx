'use client'
import React from 'react'
import { Layout } from '../../components/layout'
import { ProjectBoard } from '@/components/project-board'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Select, Option } from '@mui/joy'

const Team = () => {
    const { taskList, loading } = useSelector((state: RootState) => state.task)

    return (
        <>
            <Layout >

                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    {/* <div>Team</div> */}
                    <ProjectBoard taskList={taskList} viewOnly={true} />
                    <Select>
                        <Option value="dog">Dog</Option>
                        <Option value="cat">Cat</Option>
                    </Select>
                </div>
            </Layout>
        </>
    )
}

export default Team