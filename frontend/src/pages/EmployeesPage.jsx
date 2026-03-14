import AppHeader from '../components/AppHeader'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import { useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import { Button, Typography, Modal, Spin, Select, Layout} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import EmployeesTable from '../components/EmployeesTable'
import EmployeeFormModal from '../components/EmployeeFormModal'
import {getEmployees, createEmployee, updateEmployee, deleteEmployee} from '../api/employeesApi'
import { useSearchParams } from 'react-router-dom'


const { Title } = Typography
const { Content, Footer } = Layout; // Destructure layout components

function EmployeesPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const isAdd = useMatch('/employees/add')
    const isEdit = useMatch('/employees/edit/:id')
    const editId = isEdit?.params?.id
    const [searchParams] = useSearchParams()
    const cafeFromUrl = searchParams.get('cafe')
    const [cafe, setCafe] = useState(cafeFromUrl || '')

    const handleCloseModal = () => {
        navigate('/employees')
    }

    const { data: allEmployees = [] } = useQuery({
        queryKey: ['employees'],
        queryFn: () => getEmployees()
    })
    const selectedEmployee = editId ? allEmployees.find(e => e.employee_id === editId) : null

    const { data: employees = [], isLoading } = useQuery({
        queryKey: ['employees', cafe],
        queryFn: () => getEmployees(cafe)
    })

    const handleEdit = (employee) => {
        navigate(`/employees/edit/${employee.employee_id}`)
    }


    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Delete Employee',
            content: 'Are you sure you want to delete this employee',
            okText: 'Delete',
            okType: 'danger',
            onOk: async () => {
                await deleteEmployee(id)
                queryClient.invalidateQueries({ queryKey: ['employees']})
            }
        })
    }

    if (isLoading) {
        return(
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spin size="large" />
            </div>
        )
    }

    return( 
    <Layout style={{ minHeight: '100vh' }}>
        {/* Header */}
        <AppHeader/>
        {/* Content */}
        <Content style={{ padding: '0 40px', marginTop: 24 }}>
            <div style={{ background: '#fff', padding: 24, borderRadius: 8, minHeight: 300 }}>
                {/* Header Row*/}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Title level={2} style={{ margin: 0 }}>Employees</Title>
                    <Button
                        type="primary"
                        icon={<PlusOutlined/>}
                        onClick={() => navigate('/employees/add')}
                    >
                        Add New Employee
                    </Button>
                </div>
                {/* Table */}
                <EmployeesTable
                    data = {employees}
                    onEdit = {handleEdit}
                    onDelete = {handleDelete}
                    // onView = {handleView}
                />
            </div>
            <EmployeeFormModal
                open={!!(isAdd || isEdit)}
                initialData={selectedEmployee}
                onClose = {handleCloseModal}
            />
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center' }}>
            Cafe Management App 2026 Created by Lucas Low 
        </Footer>
    </Layout>
    
    )
}
export default EmployeesPage
