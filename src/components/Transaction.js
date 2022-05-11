export default function Transaction (props) {
    const {description, value, type, date} = props
    return (
      <div>
        <div>
          <p>{date}</p>
          <p>{description}</p>
        </div>
        <p>{value}</p>
      </div>
    )
  }