"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, HelpCircle } from "lucide-react"
import { logout } from "@/features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import SecureStorage from "@/utils/SecureStorage"
import { Select, Option } from "@mui/joy"
import { useEffect, useState } from "react"
import { getOrganizationList } from "@/features/organization/organizationActions"

export function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const { organizationList } = useSelector((state: RootState) => state.organization)

  const [organization, setOrganization] = useState<any>('');
  const decoded: any = SecureStorage.getItem('decoded')
  const selectedOrganization: any = SecureStorage.getItem('selectedOrganization')
  console.log(decoded, '----+++_decoded')
  useEffect(() => {
    if (organization) {
      SecureStorage.setItem('selectedOrganization', organization)
    }
  }, [organization])

  useEffect(() => {
    if(selectedOrganization) setOrganization(selectedOrganization)
    dispatch(getOrganizationList(''))
  }, [])
  useEffect(() => {
    if(organizationList && organizationList.length< 1) window.location.href='/orgnaization/create'
  }, [organizationList])

  console.log(organizationList, '--->')

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Select
            value={organization}
            placeholder={'Select Organization'}
            onChange={(e: any, newValue: any) => setOrganization(newValue)}>
            {organizationList && organizationList.length > 0 && organizationList.map((data: any, i: any) => {
              return <Option value={data?._id}>
                {selectedOrganization === data?.organizationName && <img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />}
                <img
                  style={{
                    height: '2vh',
                    width: '2vh',
                    borderRadius: '50%'
                  }}
                  src={data && data.organizationProfilePic && data?.organizationProfilePic} />
                {data?.organizationName}
              </Option>
            })
            }
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback>
                    {decoded && decoded.fullName && decoded.fullName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {decoded && decoded.fullName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {decoded && decoded.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => dispatch(logout())}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}