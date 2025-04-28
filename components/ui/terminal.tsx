"use client"

import { useState, useEffect, useRef } from "react"

export default function Terminal() {
  const [currentCommand, setCurrentCommand] = useState("")
  const [commandIndex, setCommandIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const terminalCommands = [
    "nmap -sV -T4 192.168.1.1",
    "hydra -l admin -P rockyou.txt 192.168.1.1 http-post-form",
    "sqlmap -u 'http://example.com?id=1' --dbs",
    "metasploit > use exploit/multi/handler",
    "john --wordlist=rockyou.txt hashes.txt",
  ]

  useEffect(() => {
    // Limpiar cualquier intervalo existente
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Establecer el nuevo intervalo
    intervalRef.current = setInterval(() => {
      setCurrentCommand(terminalCommands[commandIndex])
      setCommandIndex((prevIndex) => (prevIndex + 1) % terminalCommands.length)
    }, 3000)

    // Función de limpieza
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [commandIndex])

  return (
    <div className="bg-dark p-6 rounded-lg border border-gray-800 shadow-xl">
      <div className="flex items-center mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="terminal p-4 bg-black rounded overflow-x-auto">
        <div className="mb-2">
          <span className="text-green-400">root@kali:~#</span>{" "}
          <span className="text-white">nmap -sV -T4 192.168.1.1</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500">Starting Nmap 7.92 ( https://nmap.org )</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500">Nmap scan report for 192.168.1.1</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500">PORT STATE SERVICE VERSION</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500">22/tcp open ssh OpenSSH 8.2p1 Ubuntu 4ubuntu0.3</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500">80/tcp open http Apache httpd 2.4.41</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500">443/tcp open ssl/http Apache httpd 2.4.41</span>
        </div>
        <div className="mb-2">
          <span className="text-gray-500">3306/tcp open mysql MySQL 5.7.32</span>
        </div>
        <div className="mb-2">
          <span className="text-green-400">root@kali:~#</span>{" "}
          <span className="text-white terminal-cursor">{currentCommand}</span>
        </div>
      </div>
    </div>
  )
}
