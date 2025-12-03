import './Card.css';

interface Props {
  title: string
  value: string
  subtitle: string
}

const StatCard = ({ title, value, subtitle }: Props) => {
  return (
    <div className='stat-card'>
      <p className='title'>{title}</p>
      <h3>{value}</h3>
      <span>{subtitle}</span>
    </div>
  )
}

export default StatCard