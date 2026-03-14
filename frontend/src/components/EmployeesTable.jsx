import { useState, useEffect, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { Avatar, Button, Space, Pagination, Tooltip, theme } from 'antd'
import { EditOutlined, DeleteOutlined, ShopOutlined } from '@ant-design/icons'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

ModuleRegistry.registerModules([AllCommunityModule])

const ROW_HEIGHT = 48
const HEADER_HEIGHT = 56
const PAGINATION_HEIGHT = 56
// Everything above the table: page title + button row + dropdown + margin
const CHROME_HEIGHT = 220


function ActionButtons({ data, onEdit, onDelete }) {
  return (
    <Space size={4} style={{ height: '100%', alignItems: 'center', display: 'flex' }}>
      <Tooltip title="Edit">
        <Button
          type="text"
          size="small"
          icon={<EditOutlined style={{ color: '#4096ff' }} />}
          onClick={(e) => { e.stopPropagation(); onEdit(data) }}
        />
      </Tooltip>
      <Tooltip title="Delete">
        <Button
          type="text"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => { e.stopPropagation(); onDelete(data.employee_id) }}
        />
      </Tooltip>
    </Space>
  )
}

function EmployeesTable({ data: employees, onEdit, onDelete }) {
    const { token } = theme.useToken()
    const containerRef = useRef(null)
    const [pageSize, setPageSize] = useState(8) // default 8
    const [currentPage, setCurrentPage] = useState(1) // default 1 

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            const availableHeight = window.innerHeight - CHROME_HEIGHT - HEADER_HEIGHT - PAGINATION_HEIGHT
            const rows = Math.max(3, Math.floor(availableHeight / ROW_HEIGHT))
            setPageSize(rows)
            setCurrentPage(1)
        })
        if(containerRef.current) observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    const columnDefs = [
        {field: 'employee_id', headerName: 'Employee Id', flex: 1},
        {field: 'name', headerName: 'Name', flex: 1},
        {field: 'email_address', headerName: 'Email Address', flex: 1},
        {field: 'phone_number', headerName: 'Phone Number', flex: 1},
        {field: 'days_worked', headerName: 'Days Worked', flex:1},
        {field: 'cafe', headerName:'Cafe Name', flex:1},
        {headerName: 'Actions', width: 100,
            cellRenderer: (params) => (
                <ActionButtons data={params.data} onEdit={onEdit} onDelete={onDelete}/>
            )
        }
    ]

    const paginatedEmployees = employees.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const gridHeight = pageSize * ROW_HEIGHT + HEADER_HEIGHT

    return (
        <div ref={containerRef} style={{ marginTop: 24 }}>
            <div
                className="ag-theme-alpine"
                style={{
                    height: gridHeight,
                    borderRadius: `${token.borderRadius}px ${token.borderRadius}px 0 0`,
                    overflow: 'hidden',
                    border: `1px solid ${token.colorBorder}`,
                    borderBottom: 'none',
                }}
            >
                <AgGridReact
                    rowData = {paginatedEmployees}
                    columnDefs = {columnDefs}
                    defaultColDef={{
                        cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'},
                        suppressMovable: true
                    }}
                    pagination={false}
                    headerHeight={HEADER_HEIGHT}
                    rowHeight={ROW_HEIGHT}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: token.colorBgContainer,
                    border: `1px solid ${token.colorBorder}`,
                    borderRadius: `0 0 ${token.borderRadius}px ${token.borderRadius}px`,
                }}
            >
                <span style={{color: token.colorTextSecondary, fontSize: token.fontSize}}>
                    Total: <strong>{employees.length}</strong> employees
                </span>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={employees.length}
                    onChange={( page )=> setCurrentPage(page)}
                    showQuickJumper
                />
            </div>
        </div>
    )
}

export default EmployeesTable