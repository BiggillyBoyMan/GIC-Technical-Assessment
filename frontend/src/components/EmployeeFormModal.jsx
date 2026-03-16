import { useEffect, useState } from "react";
import { Modal, Form, Button, message, Radio, Select} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createEmployee, updateEmployee } from '../api/employeesApi'
import { getCafes } from '../api/cafesApi'
import ReusableTextbox from './ReusableTextBox'
import FormItem from "antd/es/form/FormItem";

function EmployeeFormModal({open, initialData, onClose}) {
    const [form] = Form.useForm()
    const [isDirty, setIsDirty] = useState(false)
    const queryClient = useQueryClient()
    const isEdit = !!initialData

    //N2H --> Add a new Attribute to Cafes (address)
    const { data: cafes =[] } = useQuery({
        queryKey:['cafes'],
        queryFn: () => getCafes()
    })
    //N2H
    const cafeOptions = cafes.map(cafe => ({
        value: cafe.id,
        label: `${cafe.name} — ${cafe.location} — ${cafe.id.slice(-8)}`
    }))

    useEffect(() =>{
        if (initialData) {
            form.setFieldsValue(initialData)
        } else {
            form.resetFields()
        }
        setIsDirty(false)
    }, [initialData, form])

    const handleValuesChange = () => setIsDirty(true)

    const handleClose = () => {
        if(isDirty) { 
            Modal.confirm({
                title: 'Unsaved changes',
                content: 'You have unsaved changes. Leave anyway?',
                okText: 'Leave',
                okType: 'danger',
                onOk: () => {setIsDirty(false); form.resetFields(); onClose()}
            })
        } else { 
            onClose()
        }
    }

    const handleSubmit = async () => {
        try{
            const values = await form.validateFields()
            if(isEdit) {
                await updateEmployee(initialData.employee_id, values)
            } else {
                await createEmployee(values)
            }
            queryClient.invalidateQueries({ queryKey: ['employees'] })
            message.success(`cafe ${isEdit ? 'updated' : 'created'} successfully`)
            setIsDirty(false)
            onClose()
        } catch (err) {
            if (err.response?.status === 500) {
            message.error('Email or phone number already exists')
            }
        }
    }

    return (
        <Modal
            title={isEdit ? 'Edit Employee' : 'Add New Employee'}
            open={open}
            onCancel={handleClose}
            footer={[
                <Button key="cancel" onClick={handleClose}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>Submit</Button>
            ]}
            destroyOnHidden
        >
            <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
                {/*Employee Name*/}
                <FormItem name="name" label="Name" rules={[
                    {required: true},
                    {min: 6, message: 'Min 6 Characters'},
                    {max: 10, message: 'Max 10 Characters'},
                    { pattern: /^[a-zA-Z\s]+$/, message: 'Name must only contain letters' }
                ]}>
                    <ReusableTextbox placeholder={"Employee Name"}/>
                </FormItem>
                
                {/*Email*/}
                <FormItem name="email_address" label="Email" rules={[
                    {required: true, message: 'Email is required'},
                    {type: 'email', message: 'Please enter a valid email address'}
                ]}>
                    <ReusableTextbox placeholder={"Email Address"}/>
                </FormItem>

                {/*Phone Number*/}
                <FormItem name="phone_number" label = "Phone Number" rules={[
                    {required: true, message: 'Phone number is required'},
                    {pattern: /^[89]\d{7}$/,
                     message: 'Must start with 8 or 9 and have 8 digits'   
                    }
                ]}>
                    <ReusableTextbox placeholder={"Phone Number"}/>
                </FormItem>

                {/* Gender */}
                <FormItem name="gender" label = "Gender" rules={[
                    {required: true, message: 'Please select a gender'}
                ]}>
                    <Radio.Group>
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                    </Radio.Group>
                </FormItem>
                {/*Cafe Dropdown*/}
                <FormItem name="cafe_id" label="Assigned Cafe (· Cafe Name · Location · Last 8 digit UUID)">
                    <Select
                        options={cafeOptions}
                        placeholder="Select a cafe"
                        allowClear
                    />
                </FormItem>
            </Form>
        </Modal>
    )
}
export default EmployeeFormModal