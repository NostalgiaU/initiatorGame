import PhotoImg from '../assets/photo.jpg'

export const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between py-10 px-20">
      <div className="flex items-center gap-3">
        <img className="w-12 h-12 rounded-full" src={PhotoImg} alt="" />
        <div className="text-lg">Hero</div>
      </div>
      <div className="text-[20px]">17:00 PM</div>
    </div>
  )
}
