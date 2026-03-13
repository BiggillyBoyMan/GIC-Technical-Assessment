import { Input } from 'antd'

function ReusableTextbox({ value, onChange, placeholder, ...props }) {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default ReusableTextbox