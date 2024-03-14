import { Label } from '@radix-ui/react-label'
import React, { ReactNode, useMemo, useState } from 'react'

export const Upload: React.FC<{
  children: ReactNode
  type?: 'image'
  onChange?: (file: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ children, type, onChange }) => {
  const [imageUrl, setImageUrl] = useState<string>('')

  const id = useMemo(() => {
    return crypto.randomUUID()
  }, [])

  return (
    <>
      <Label htmlFor={id} className="cursor-pointer w-[50px] h-[50px]" title="点击上传">
        {type === 'image' && imageUrl ? (
          <img className="w-full h-full object-cover" src={imageUrl} alt="" title="更换图片" />
        ) : (
          children
        )}
      </Label>
      <input
        id={id}
        hidden
        type="file"
        onChange={(e) => {
          console.log(e)
          const url = e.target.files?.[0]
          url && setImageUrl(URL.createObjectURL(url))
          onChange?.(e)
        }}
      />
    </>
  )
}
