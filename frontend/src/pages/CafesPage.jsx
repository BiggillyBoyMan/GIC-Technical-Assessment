import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Space, Tag, Modal, Spin, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getCafes, deleteCafe } from '../api/cafesApi'
import CafesTable from '../components/CafesTables'

const { Title } = Typography

function CafesPage() {
    const [location, setLocation] = useState('')
    const navigate = useNavigate()
    const queryClient = useQueryClient()

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

    const handleEdit = (cafe) => {
        navigate(`/cafes/edit/${cafe.id}`)
    }

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Delete Cafe',
            content: 'Are you sure you want to delete this cafe?',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                await deleteCafe(id)
                queryClient.invalidateQueries({ queryKey: ['cafes'] })
            }
        })
    }

    if (isLoading) return (
        <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
            <Spin size="large" />
        </div>
    )

    return (
        <div style={{ padding: 40 }}>
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
    )
}

export default CafesPage
