// import { Button } from '@renderer/components/Button'
import classNames from 'classnames'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@src/hooks/data-hooks'
import { Button } from '@ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@renderer/components/ui/dialog'
import { FolderPlus, Plus } from 'lucide-react'
import { Input } from '@renderer/components/ui/input'
import { Label } from '@renderer/components/ui/label'
import { Upload } from '@renderer/components/Upload'
import { GameData } from '@src/types'
import { useConfigAction } from '@renderer/hooks/action-hooks'
import { ButtonMode, GamepadButtons } from '@renderer/components/GamepadButtons'

const SideBar = () => {
  const itemCls = classNames(
    'py-3 w-full hover:bg-slate-500 bg-opacity-50 hover:shadow-lg cursor-pointer'
  )

  const [active, setActive] = useState(2)

  const items = [
    {
      key: 1,
      name: '通用'
    },
    {
      key: 2,
      name: '游戏库'
    }
  ]
  return (
    <div className="flex w-full h-full">
      <div className="shrink-0 bg-slate-600 bg-opacity-50 h-full w-[180px] text-center rounded-md overflow-hidden">
        {items.map((item) => {
          return (
            <div
              className={classNames(itemCls, {
                'bg-slate-500 shadow-lg': active === item.key
              })}
              key={item.key}
              onClick={() => setActive(item.key)}
            >
              {item.name}
            </div>
          )
        })}
      </div>
      <div className="mx-10 w-full h-full overflow-auto ">
        <GameHub />
      </div>
    </div>
  )
}

const GameHandleDialog: React.FC<{
  type: 'edit' | 'add'
  data?: GameData
  children: ReactNode
  onConfirm?: (data: GameData) => void
}> = ({ data, type, children, onConfirm }) => {
  const [open, setOpen] = React.useState(false)
  const [form, updateForm] = useState(data)

  const text = useMemo(() => {
    return type === 'add' ? '添加游戏' : '编辑游戏'
  }, [])

  useEffect(() => {
    if (!open && type === 'add') updateForm(undefined)
  }, [open, type])

  const onChange = (name, value) => {
    // @ts-ignore
    updateForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-8 items-center gap-4">
            <Label className="text-right">名称</Label>
            <Input
              id="name"
              defaultValue={form?.name}
              placeholder="请输入游戏名称"
              className="col-span-7"
              onChange={(e) => {
                onChange('name', e.target.value)
              }}
            />
          </div>
          {/* <div className="grid grid-cols-8 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          别名
        </Label>
        <Input id="username" value="@peduarte" className="col-span-7" />
      </div> */}
          <div className="grid grid-cols-8 items-center gap-4">
            <Label className="text-right">路径</Label>
            <div className="flex w-full max-w-sm items-center space-x-2 col-span-7">
              <Input
                id="gameUrl"
                value={form?.gameUrl}
                placeholder="请输入路径"
                onChange={(e) => {
                  onChange('gameUrl', e.target.value)
                }}
              />
              <div>
                <Upload
                  onChange={(e) => {
                    onChange('gameUrl', e.target.files?.[0].path)
                  }}
                >
                  <FolderPlus size={28} strokeWidth={1.75} />
                </Upload>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              封面
            </Label>
            <Upload
              type="image"
              onChange={(e) => {
                onChange('iconUrl', e.target.files?.[0].path)
              }}
            >
              <div className="w-[50px] h-[50px] flex items-center justify-center border text-center rounded-sm">
                {form?.iconUrl ? <img src={form?.iconUrl} alt="" /> : <Plus />}
              </div>
            </Upload>
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              背景
            </Label>
            <Upload
              type="image"
              onChange={(e) => {
                onChange('bgUrl', e.target.files?.[0].path)
              }}
            >
              <div className="w-[50px] h-[50px] flex items-center justify-center border text-center rounded-sm">
                {form?.bgUrl ? <img src={form?.bgUrl} alt="" /> : <Plus />}
              </div>
            </Upload>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              onConfirm?.(form!)
              setOpen(false)
            }}
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const GameHub = () => {
  const { configData } = useStore()
  const { games } = configData
  const { createGame, editGame, delGame } = useConfigAction()

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="pb-4 shrink-0">
        <GameHandleDialog
          type="add"
          onConfirm={(e) => {
            createGame(e)
          }}
        >
          <Button variant="default" size="sm">
            添加游戏
          </Button>
        </GameHandleDialog>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" size="sm">
              添加游戏
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>添加游戏</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Link
                </Label>
                <Input id="link" defaultValue="https://ui.shadcn.com/docs/installation" />
              </div>
              <Button type="submit" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </div>
      <div className="flex flex-col gap-4 h-full overflow-auto no-scroll">
        {games.map((item) => {
          return (
            <div className="flex justify-between items-center" key={item.id}>
              <div className="flex items-center gap-4">
                <img src={item.iconUrl} className="w-[100px] h-[100px] rounded-sm" />
                <div>{item.name}</div>
              </div>
              <div className="flex gap-2">
                <GameHandleDialog
                  type="edit"
                  data={item}
                  onConfirm={(e) => {
                    editGame(item.id, e)
                  }}
                >
                  <Button size="sm" className="text-xs">
                    编辑
                  </Button>
                </GameHandleDialog>
                <Button
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    delGame(item.id)
                  }}
                >
                  删除
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Setting: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="h-full  overflow-hidden">
      {/* <div onClick={() => navigate(-1)}>back</div> */}
      <div className="w-[70%] mx-auto h-[70%] box-border">
        <div className="text-[28px] my-8">设置</div>
        <SideBar />
      </div>
      <GamepadButtons
        buttons={[ButtonMode.Back]}
        onChange={(event) => {
          switch (event) {
            case ButtonMode.Back:
              navigate(-1)
              break

            default:
              break
          }
        }}
      />
    </div>
  )
}

export default Setting
