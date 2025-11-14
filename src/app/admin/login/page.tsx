"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setStatus(null)

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (response.ok) {
      router.push("/admin/content")
      router.refresh()
    } else {
      const data = await response.json()
      setStatus(data.error ?? "登录失败")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>管理员登录</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700">
              管理密码
              <input
                type="password"
                className="mt-1 w-full rounded border border-gray-200 p-2"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            {status && <div className="text-sm text-red-600">{status}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "登录中..." : "登录后台"}
            </Button>
          </form>
          <p className="text-xs text-gray-400 mt-4">
            环境变量 <code>ADMIN_PASSWORD</code> 可自定义后台密码，<code>ADMIN_TOKEN_SECRET</code> 用于生成令牌。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
