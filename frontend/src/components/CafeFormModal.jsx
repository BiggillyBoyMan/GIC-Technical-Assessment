import { useEffect, useState } from "react";
import { Modal, Form, Button, Upload, message} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createCafe, updateCafe } from '../api/cafesApi'
import ReusableTextbox from './ReusableTextBox'
import FormItem from "antd/es/form/FormItem";

function CafeFormModal({open, initialData, onClose}){
    const [form] = Form.useForm()
    const [isDirty, setIsDirty] = useState(false)
    const queryClient = useQueryClient()
    const isEdit = !!initialData

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData)
        } else {
            form.resetFields()
        }
        setIsDirty(false)
    }, [initialData, form])

    const handleValuesChange = () => setIsDirty(true)

    const handleClose = () => {
        if (isDirty) {
            Modal.confirm({
                title: 'Unsaved changes',
                content: 'You have unsaved changes. Leave anyway?',
                okText: 'Leave',
                okType: 'danger',
                onOk: () => { setIsDirty(false); onClose()}
            })
        } else {
            onClose()
        }
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            if (isEdit){ 
                await updateCafe(initialData.id, values)
            } else{
                await createCafe(values)
            }
            queryClient.invalidateQueries({ queryKey: ['cafes'] })
            message.success(`Cafe ${isEdit ? 'updated' : 'created'} successfully`)
            setIsDirty(false)
            onClose()

        } catch {
            //validation errors (placeholder)
        }
    }

    return (
        <Modal
        title={isEdit ? 'Edit Cafe' : 'Add New Cafe'}
        open={open}
        onCancel={handleClose}
        footer={[
            <Button key="cancel" onClick={handleClose}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={handleSubmit}>Submit</Button>
        ]}
        destroyOnHidden
        >
            <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
                {/*CafeName Text*/}
                <FormItem name="name" label="Name" rules={[
                    {required: true},
                    {min: 6, message: 'Min 6 Characters'},
                    {max: 10, message: 'Max 10 Characters'}
                ]}>
                    <ReusableTextbox placeholder="Cafe name"/>
                </FormItem>
                {/*Description*/}
                <FormItem name="description" label="Description" rules={[
                    { required: true},
                    { max: 256, message: 'Maximum 256 characters' }
                ]}>
                    <ReusableTextbox placeholder={"Description"}/>
                </FormItem>
                <Form.Item name="logo" label="Logo" valuePropName="file" getValueFromEvent={e => e?.file}>
                    <Upload
                        beforeUpload={(file) => {
                        if (file.size > 2 * 1024 * 1024) {
                            message.error('Logo must be under 2MB')
                            return Upload.LIST_IGNORE
                        }
                        return false
                        }}
                        maxCount={1}
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>Upload Logo</Button>
                    </Upload>
                </Form.Item>
                {/*Location*/}
                <FormItem name="location" label="Location" rules={[
                    {required: true},
                ]}>
                    <ReusableTextbox placeholder={"Location"}/>
                </FormItem>
            </Form>
        </Modal>
    )


}
export default CafeFormModal