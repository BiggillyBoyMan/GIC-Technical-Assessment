import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useMatch, useNavigate } from 'react-router-dom'
import { Button, Typography, Modal, Spin, Select, Layout } from 'antd' // Added Layout
import { PlusOutlined } from '@ant-design/icons'
import { getCafes, deleteCafe } from '../api/cafesApi'
import CafesTable from '../components/CafesTables'
import AppHeader from '../components/AppHeader'

const { Title } = Typography
const { Content, Footer } = Layout; // Destructure layout components

function CafesPage() {
    const [location, setLocation] = useState('')
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const isAdd = useMatch('/cafes/add')
    const isEdit = useMatch('/cafes/edit/:id')
    const editId = isEdit?.params?.id
    const handleCloseModal = () => navigate('/cafes')

    const { data: allCafes = [] } = useQuery({
        queryKey: ['cafes'],
        queryFn: () => getCafes()
    })

    const { data: cafes = [], isLoading } = useQuery({
        queryKey: ['cafes', location],
        queryFn: () => getCafes(location)
    })

    const locations = [...new Set(allCafes.map(c => c.location))]
    const locationOptions = [
        {value: '', label: 'All Locations'},
        ...locations.map(loc=> ({ value: loc, label: loc}))
    ]

    const [selectedCafe, setSelectedCafe] = useState(null)

    const handleEdit = (cafe) => {
        setSelectedCafe(cafe)
        navigate(`/cafes/edit/${cafe.id}`)
    }

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Delete Cafe',
            content: 'Are you sure you want to delete this cafe?',
            okText: 'Delete',
            okType: 'danger',
            onOk: async () => {
                await deleteCafe(id)
                queryClient.invalidateQueries({ queryKey: ['cafes'] })
            }
        })
    }

    if (isLoading) return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" />
        </div>
    )

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 1. Header */}
            <AppHeader />

            {/* 2. Content */}
            <Content style={{ padding: '0 40px', marginTop: 24 }}>
                <div style={{ background: '#fff', padding: 24, borderRadius: 8, minHeight: 300 }}>
                    
                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <Title level={2} style={{ margin: 0 }}>Cafes</Title>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => navigate('/cafes/add')}
                        >
                            Add New Cafe
                        </Button>
                    </div>

                    {/* Drop Down */}
                    <Select
                        value={location}
                        onChange={setLocation}
                        options={locationOptions}
                        style={{ width: 200, marginBottom: 16 }}
                        placeholder="Filter by location"
                    />

                    {/* Table */}
                    <CafesTable
                        cafes={cafes}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </Content>

            {/* 3. Footer */}
            <Footer style={{ textAlign: 'center' }}>
                Cafe Management {new Date().getFullYear()} Created by Lucas Low
            </Footer>
        </Layout>
    )
}

export default CafesPage